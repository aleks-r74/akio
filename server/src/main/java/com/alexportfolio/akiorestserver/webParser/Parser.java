package com.alexportfolio.akiorestserver.webParser;


import com.alexportfolio.akiorestserver.exceptions.ParsingException;
import com.alexportfolio.akiorestserver.repository.entities.Authority;
import com.alexportfolio.akiorestserver.repository.entities.TransactionEnt;
import com.alexportfolio.akiorestserver.repository.entities.WorkScheduleEnt;
import com.alexportfolio.akiorestserver.service.TransactionsService;
import com.alexportfolio.akiorestserver.service.UsersService;
import com.alexportfolio.akiorestserver.service.WorkScheduleService;
import jakarta.annotation.PreDestroy;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class Parser extends ParserUtils {

    TransactionsService transactionsService;
    WorkScheduleService workScheduleService;
    UsersService usersService;
    Environment env;
    @Value("${parseServiceNames}")
    Boolean parseServiceNames = true;

    @Autowired
    public Parser(TransactionsService transactionsService, WorkScheduleService workScheduleService, UsersService usersService, Environment env) throws IOException, InterruptedException {
        this.workScheduleService = workScheduleService;
        this.transactionsService = transactionsService;
        this.usersService = usersService;
        this.env = env;
    }

    public Parser() throws IOException,InterruptedException { }

    private void login(){
        // if already logged in - exit
        if(getElement(xpaths.get("logout_btn"), WaitType.PRESENCE,2).isPresent()) return;
        driver.get("https://cloud.pay-point.com");
        String username = env.getProperty("AKIO_SL_USR");
        String psw = env.getProperty("AKIO_SL_PSW");
        getElement(xpaths.get("input_login"), WaitType.CLICKABLE).ifPresent(el->el.sendKeys(username));
        getElement(xpaths.get("input_psw"), WaitType.CLICKABLE).ifPresent(el->el.sendKeys(psw));
        getElement(xpaths.get("login_btn"), WaitType.CLICKABLE).ifPresent(WebElement::click);
        waitForNewElements();
        if(getElement(xpaths.get("logout_btn"), WaitType.PRESENCE,5).isEmpty())
            throw new RuntimeException("Login wasn't successful");
    }


    public TreeSet<TransactionEnt> getTransactions(LocalDate start, LocalDate end){
        login(); // in case the session was terminated by the server
        driver.get("https://cloud.pay-point.com/server/dispatcher/v2/operations.seam");
        long days = ChronoUnit.DAYS.between(start, end) ;
        TreeSet<TransactionEnt> allTransactions = new TreeSet<>();
        List<String> allEmployees = usersService.getUsersByAuthorities(List.of(Authority.ROLE_EMPLOYEE));
        for(int d=0; d < days+1; d++){
            var dday = start.plusDays(d);
            List<WorkScheduleEnt> employeeOnDuty = workScheduleService.getSchedule(dday, dday);
            var transactionsParsed = parseDay(dday);
            // assign employee to the transactions if there is only one employee on duty and it is legit username
            if(employeeOnDuty!=null && employeeOnDuty.size()==1 && allEmployees.contains(employeeOnDuty.getFirst().getEmployee())) {
                String employee = employeeOnDuty.getFirst().getEmployee();
                transactionsParsed = transactionsParsed.stream().map(t -> {t.setEmployee(employee); return t;}).collect(Collectors.toSet());
            }
            allTransactions.addAll(transactionsParsed);
        }
        return allTransactions;
    }

    private Collection<TransactionEnt> parseDay(LocalDate day) {
        var existentTransactions = transactionsService.findAllTransactionsBetween(LocalDateTime.of(day,LocalTime.of(0,0,0)), LocalDateTime.of(day,LocalTime.of(23,59,59)));
        Map<Integer, TransactionEnt> foundTransactions = new HashMap<>();


        var dtFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");
        String strFrom = LocalDateTime.of(day, LocalTime.of(0,0,0)).format(dtFormatter);
        String strTo = LocalDateTime.of(day, LocalTime.of(23,59,59)).format(dtFormatter);
        getElement(xpaths.get("input_date_start"),WaitType.CLICKABLE)
                .ifPresent(el->{
                    el.clear();
                    el.sendKeys(strFrom);
                });

        getElement(xpaths.get("input_date_end"),WaitType.CLICKABLE)
                .ifPresent(el->{
                    el.clear();
                    el.sendKeys(strTo);
                });

        getElement(xpaths.get("checkbox_all_transactions"),WaitType.CLICKABLE).ifPresent(WebElement::click);
        getElement(xpaths.get("submit_search"),WaitType.CLICKABLE).ifPresent(WebElement::click);
        waitForNewElements();
        // here we iterate over each page
        do{
            var rows = getElements(xpaths.get("table_rows"));
            if(rows.isEmpty()) break;

            // these two var's are used for calculating sum of saved transactions on the page
            BigDecimal thisPageTransactionsSum =  new BigDecimal(0);
            Set<Integer> thisPageUniqueReceiptNumbers = new HashSet<>();

            // here we iterate over each transaction on the page
            transactionsLoop: for(var transactionRow : rows.get()){

                js.executeScript("arguments[0].scrollIntoView(true);", transactionRow);
                // get current transaction receipt number

                String receipt_num$ = transactionRow.findElement(By.xpath(xpaths.get("col_receipt_num"))).getText().strip();
                Integer receipt_num = Integer.valueOf(receipt_num$);
                // check we have this receipt number parsed, if parsed - skip
                for(var existentTransaction : existentTransactions) {
                    if(existentTransaction.getReceipt_num() == receipt_num) {
                        // if this is the first time we iterate over this transaction, add its sum to the thisPageTransactionsSum
                        if(!thisPageUniqueReceiptNumbers.contains(receipt_num))
                            thisPageTransactionsSum = thisPageTransactionsSum.add(existentTransaction.getMoney_accepted());
                        thisPageUniqueReceiptNumbers.add(receipt_num);
                        continue transactionsLoop;
                    }
                }

                // raw parsed data
                String op_date$ = transactionRow.findElement(By.xpath(xpaths.get("col_op_date"))).getText().strip();
                String op_status$ = transactionRow.findElement(By.xpath(xpaths.get("col_op_status"))).getText().strip();
                String phone_num = transactionRow.findElement(By.xpath(xpaths.get("col_phone_num"))).getText().strip();
                String money_accepted$ = transactionRow.findElement(By.xpath(xpaths.get("col_money_accepted"))).getText().strip();
                String money_posted$ = transactionRow.findElement(By.xpath(xpaths.get("col_money_posted"))).getText().strip();
                String payment_type = transactionRow.findElement(By.xpath(xpaths.get("col_payment_type"))).getText().strip();

                // type conversion
                LocalDateTime op_date = LocalDateTime.parse(op_date$, DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss"));
                Boolean op_status = !op_status$.contains("Ошибка"); // everything that is not Ошибка should be true
                BigDecimal money_accepted = new BigDecimal(money_accepted$.replaceAll("[^\\d.]",""));
                BigDecimal money_posted = new BigDecimal(money_posted$.replaceAll("[^\\d.]",""));
                payment_type = payment_type.contains("Наличные") ? "cash" : "card";
                // ----------------------

                thisPageTransactionsSum = thisPageTransactionsSum.add(money_accepted);

                // extract service name
                String serviceName = "";
                if(parseServiceNames) {
                    String dynamicDetailsKey = "Услуга";
                    Map<String, String> dynamicDetails = getTransactionDynamicDetails(transactionRow, dynamicDetailsKey);
                    serviceName = dynamicDetails.get(dynamicDetailsKey).strip() + "\n";
                }

                // create new TransactionEnt
                TransactionEnt parsedTransaction =
                        new TransactionEnt(op_status, receipt_num, phone_num, op_date, money_accepted, money_posted,payment_type, serviceName);

                // put the transaction into the map. If it already exists, we update existent transaction
                foundTransactions.compute(parsedTransaction.getReceipt_num(),(existent_receipt_num,existent_transaction)->{
                    if(existent_transaction!=null) // update info for existing transaction
                        return existent_transaction.addInfo(
                                parsedTransaction.getMoney_accepted(),
                                parsedTransaction.getMoney_posted(),
                                parsedTransaction.getServices()
                        );
                    else
                        return parsedTransaction;
                });

            }
            // here we should check that sum of all found transactions equals to the total money accepted in the table
            String money_accepted_summary = getElement(xpaths.get("total_money_accepted"),WaitType.PRESENCE).get()
                    .getText()
                    .replaceAll("[^\\d.]", "");

            if(!thisPageTransactionsSum.equals(new BigDecimal(money_accepted_summary)))
                throw new ParsingException("Parsed sum:%s Total sum:%d".formatted(money_accepted_summary,thisPageTransactionsSum));

        } while(goNextPage());
        return foundTransactions.values();
    }

    private Map<String, String> getTransactionDynamicDetails(WebElement transactionRow, String... details) {
        Map<String, String> detailsMap = new HashMap<>();
        String rowNumber = transactionRow.findElement(By.xpath(xpaths.get("col_row_num"))).getText().strip();
        // we need it to start from 0 for transactionDetailsXpath
        rowNumber = String.valueOf(Integer.parseInt(rowNumber)-1);
        String transactionDetailsXpath = xpaths.get("dynamic_details_link").replace("[NUMBER]", rowNumber);

        // opens new dialog
        transactionRow.findElement(By.xpath(transactionDetailsXpath)).click();

        // waits for the dialog to be loaded
        waitForNewElements();
        var dynamicDetailsInfoTable = getElement(xpaths.get("dynamic_details_info_table"), WaitType.PRESENCE);
        if (dynamicDetailsInfoTable.isEmpty()) throw new RuntimeException("Can not extract Service name from dynamic window");

        // information in the table is key-value pairs
        var dynamicDetailsInfoKeys = dynamicDetailsInfoTable.get().findElements(By.xpath(xpaths.get("dynamic_details_info_key")));
        outerLoop: for(var key: dynamicDetailsInfoKeys){
            for(var detail : details){
                if(key.getText().contains(detail)) {
                    String value = key.findElement(By.xpath(xpaths.get("dynamic_details_info_value"))).getText().strip();
                    detailsMap.put(detail, value);
                    if(detailsMap.size() == details.length) break outerLoop;
                }
            }
          }

        driver.findElement(By.xpath(xpaths.get("dynamic_details_close"))).click();
        return  detailsMap;

    }

    private void waitForNewElements() {
        // waits for the dialog to be loaded
        var spinner = getElement(xpaths.get("loading_spinner"),WaitType.PRESENCE);
        if(spinner.isPresent()) {
            new WebDriverWait(driver, Duration.ofMillis(10000))
                    .until(ExpectedConditions.invisibilityOf(spinner.get()));
        }
    }

    private boolean goNextPage() {
        boolean[] flag = new boolean[]{false};
        getElement(xpaths.get("table_next_page"),WaitType.PRESENCE).ifPresent(el->{
            if(!el.getAttribute("class").contains("ui-state-disabled")){
                var currPageTextEl = getElement(xpaths.get("table_curent_page_text"), WaitType.PRESENCE);
                el.click();
                wDriver.until(ExpectedConditions.stalenessOf(currPageTextEl.get()));
                flag[0] = true;
            }
        });
        return flag[0];
    }

    public BigDecimal getTotalCashFromTerminal(){
        login(); // in case the session was terminated by the server
        String cashStr = "";
        for(int i=0; i<5; i++){
            driver.get("https://cloud.pay-point.com/server/monitoring/equipment_statuses3.seam");
            var cash = getElement(xpaths.get("total_cash_in_terminal"), WaitType.PRESENCE,5);
            cashStr = cash.map(WebElement::getText).orElse("0");
            cashStr = cashStr.replaceAll("[^0-9]","");
            if(!cashStr.equals("0"))
                break;
        }
        return new BigDecimal(cashStr);
    }

    @PreDestroy
    void destroy(){
        driver.close();
    }
}

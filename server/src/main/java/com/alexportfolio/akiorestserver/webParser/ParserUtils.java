package com.alexportfolio.akiorestserver.webParser;


import com.alexportfolio.akiorestserver.AkioRestServerApplication;
import org.openqa.selenium.*;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.remote.UnreachableBrowserException;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.*;
import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

class NoElementsException extends RuntimeException{}

public class ParserUtils {

    public enum WaitType { PRESENCE, CLICKABLE; }
    public WebDriver driver;
    WebDriverWait wDriver;
    JavascriptExecutor js;
    public static Map<String,String> xpaths;
    private final int FLUENT_WAIT_TIMEOUT = 2000;

    private static final Logger logger = LoggerFactory.getLogger(ParserUtils.class);

    public ParserUtils() throws IOException, InterruptedException {
        Thread parser = new Thread(){
            @Override
            public void run(){
                ParserUtils.this.driver = new EdgeDriver();
                wDriver = new WebDriverWait(driver, Duration.ofMillis(FLUENT_WAIT_TIMEOUT));
                js = (JavascriptExecutor) driver;
                driver.manage().window().maximize();
            }
        };
        parser.setDaemon(false);
        parser.setPriority(Thread.MAX_PRIORITY);
        parser.start();
        parser.join();
        ParserUtils.loadXpathProperties();
    }

    public Optional<WebElement> getElement(String xpath, WaitType w, Integer... waitTimeSec) {
        Optional<WebElement> element= Optional.empty();
        WebDriverWait newWDriver = wDriver;
        if (waitTimeSec.length>0) newWDriver = new WebDriverWait(driver,Duration.ofSeconds(waitTimeSec[0]));
        for(int i=0; i<2; i++)
            try{
                driver.getCurrentUrl(); // Throws right Exception if browser is closed
                element = Optional.of(
                        switch (w) {
                            case PRESENCE ->
                                    newWDriver.until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath)));
                            case CLICKABLE ->
                                    newWDriver.until(ExpectedConditions.elementToBeClickable(By.xpath(xpath)));
                });
                break;
            }catch(TimeoutException e){
                sleep(1000);
            }
        return element;
    }

    public Optional<WebElement> getChildElement(WebElement parent, String childXpath, WaitType w) {
        Optional<WebElement> element= Optional.empty();
        for(int i=0; i<2; i++)
            try{
                element = Optional.of(parent.findElement(By.xpath(childXpath)));
                break;
            }catch(NoSuchElementException e){
                sleep(1000);
            }
        return element;
    }

    // Gracefully locating a collection of elements with retry mechanism
    public Optional<List<WebElement>> getElements(String xpath) {
        //re-try mechanism
        Optional<List<WebElement>> items = Optional.empty();
        for(int i=0;i<2;i++)
            try{
                driver.getCurrentUrl(); // Throws right Exception if browser is closed
                items = Optional.of(wDriver.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.xpath(xpath))));
                if(items.isEmpty()) throw new NoElementsException();
                break;
            } catch(TimeoutException | NoElementsException e){
                if(i==1) return Optional.empty();
                sleep(2000);
            }
        return items;
    }


    //Typing text
    public void typeText(WebElement e, String s) {
        if (e == null || s == null) throw new InvalidArgumentException("element or string to type in can not be null");
        char[] array = s.strip().toCharArray();
        js.executeScript("arguments[0].focus();", e);
        for (char ch : array) {
            e.sendKeys("" + ch);
            sleep(20);
        }
    }

    public void sleep(int ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    //static for multithreading use
    public static void loadXpathProperties() throws IOException {
        if (xpaths != null) return; // return if xpaths exists

        Properties properties = new Properties();
        try(var fis = ParserUtils.class.getClassLoader().getResourceAsStream("xpath.properties")){
            properties.load(fis);
        }
        // remove empty properties and remove whitespaces in keys and values
       xpaths = properties.entrySet()
                .stream()
                .filter(
                      entry->!entry.getKey().toString().isBlank() &&
                       !entry.getValue().toString().strip().isBlank()
                )
                .collect(Collectors.toMap(
                       entry->entry.getKey().toString().strip(),
                       entry->entry.getValue().toString().strip()
               ));

    }

    void highlight(WebElement el){
        String script = "arguments[0].style.border = '1px solid yellow';";
        js.executeScript(script, el);
    }

}

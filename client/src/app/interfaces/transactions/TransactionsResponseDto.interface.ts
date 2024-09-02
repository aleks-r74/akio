import { TransactionDto } from "./transactionDto.interface";

export interface TransactionsResponseDto{
    count: number,
    sum: number,
    pageSum: number,
    currentPage: number,
    totalPages: number,
    transactionsOnThePage : TransactionDto[],
    employeesSum: Map<string,number>;
}

export interface EmployeeCalc{
    name: string;
    sum: number;
  }
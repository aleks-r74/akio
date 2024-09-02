import { MoneyFlowDto } from "./moneyFlowDto.interface";

export interface MoneyFlowResponseDto{
    currentPage: number,
    totalPages: number,
    totalSum: number,
    totalSumPage: number,
    transactionsNum: number,
    moneyFlows: MoneyFlowDto[]
}
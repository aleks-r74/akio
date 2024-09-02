import { MoneyContainerDto } from "./moneyContainerDto.interface";
import { MoneyFlowDto } from "./moneyFlowDto.interface";

export interface ContainersSummaryDto{
    containers: MoneyContainerDto[];
    lastTransactions: MoneyFlowDto[];
    summarizedTransactions: MoneyFlowDto[];
    allowedSources: string[];
    allowedDests: string[];
}
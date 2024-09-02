
export interface SummaryDto {
    date: string;
    totalRevenue: number;
    expenses: Map<string,number>,
    netRevenue: number;
    totalCash: number;
    freeHaircuts: number;
    totalReceipts: number;
    notAssignedTransactions: number;
    balances: Map<string,number>;
  }

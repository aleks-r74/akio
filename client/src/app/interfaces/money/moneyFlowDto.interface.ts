export interface MoneyFlowDto {
    time_stamp?: string;
    receipt_num?: number;
    source: string;
    dest: string;
    amount: number;
    description: string;
    initiator?: string;
}
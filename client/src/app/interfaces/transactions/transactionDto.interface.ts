export interface TransactionDto {
    finished: boolean;
    has_free_haircut: boolean;
    receipt_num: number;
    phone_num: string;
    date_time: string;
    money_accepted: number;
    money_posted: number;
    payment_type: string;
    services: string;
    employee: string;
    readonly: boolean;
}
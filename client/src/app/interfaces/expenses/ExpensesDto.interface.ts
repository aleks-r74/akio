export interface ExpensesDto { 
    id: number,
    source: string,
    dest: string,
    due_day: number|null,
    amount: number|null,
    percent: number|null,
    description: string;
}
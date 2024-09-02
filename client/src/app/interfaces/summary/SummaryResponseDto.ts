import { EmployeeSummaryDto } from "./EmployeeSummaryDto";
import { SummaryDto } from "./summaryDto.interface";
export interface SummaryResponseDto{
    summary: SummaryDto;
    employees: Map<string,EmployeeSummaryDto[]>;
}
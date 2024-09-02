import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeCalc } from '../../interfaces/transactions/TransactionsResponseDto.interface';

@Component({
  selector: 'app-employee-total',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './employee-total.component.html',
  styleUrl: './employee-total.component.css'
})
export class EmployeeTotalComponent {
@Input() employeeCalcs?: EmployeeCalc[];
@Output() saveClick = new EventEmitter();
@Output() resetClick = new EventEmitter();
screenSize = screen.width;
  onSaveClick(){
    this.saveClick.emit();
  }
  onResetClick(){
    this.resetClick.emit();
  }
}


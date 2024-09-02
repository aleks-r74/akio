import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  @Input() title!: string;
  @Input() disabled: boolean = false;
  @Output() confirmed = new EventEmitter<boolean>();

  onConfirm(confirm: boolean){
    this.confirmed.emit(confirm);
  }
}

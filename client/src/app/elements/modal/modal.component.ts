import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() active: boolean = false;
  @Output('close') closeEvent = new EventEmitter<boolean>();

  closeDetails(){
    this.closeEvent.emit(true);
  }
}

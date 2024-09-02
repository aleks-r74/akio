import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-new',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.css'
})
export class AddNewComponent {
  @Output() addNew = new EventEmitter();
  onAddNewClick(){
    this.addNew.emit();
  }
}

import { TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent implements OnInit, AfterViewInit{
  @Input() options!: string[];
  @Input() control!: FormControl;
  @Input() firstOption!: string;
  @Input() defaultValue!: string;
  upperCaseOptions?: string[]

  ngOnInit(): void {
    if(!this.upperCaseOptions)
      this.upperCaseOptions = this.options.map(o=>o.charAt(0).toUpperCase() + o.slice(1));

  }

  ngAfterViewInit(): void {
    let value: string = this.control.value;
    setTimeout(()=>this.control?.setValue(value),0);
  }


}

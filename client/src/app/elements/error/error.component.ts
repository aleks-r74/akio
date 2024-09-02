import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, input, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

error = input<HttpErrorResponse>();


}

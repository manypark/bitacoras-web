import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector  : 'app-button',
  imports   : [CommonModule],
  template  : `
    <button 
      [disabled]="disabled"
      type="button" 
      class="btn w-96 h-12 text-xl"
      (click)="onClick.emit()">
      @if (loading) {
        Cargando...
      }
      @if (!loading) {
        {{ label }}
      }
    </button>
  `
})
export class SubmitButtonComponent {
  @Input() label = 'Enviar';
  @Input() loading = false;
  @Input() disabled = false;

  @Output() onClick = new EventEmitter<void>();
}
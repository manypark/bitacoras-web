import { Component, EventEmitter, input, Input, Output } from '@angular/core';

@Component({
  selector    : 'app-custom-table',
  imports     : [],
  templateUrl : './custom-table.component.html',
  styleUrl    : './custom-table.component.css',
})
export class CustomTableComponent {

   /** Encabezados de la tabla */
  headers = input.required<string[]>();

  /** Datos del cuerpo */
  @Input() data: any[] = [];

  /** Título o caption */
  @Input() caption: string = '';

  /** Indica si está cargando */
  isLoading = input.required<boolean>();

  /** Claves de los datos que corresponden a cada columna */
  keys = input.required<string[]>();

  /** Acciones disponibles: [{label: 'Editar', action: 'edit'}, ...] */
  @Input() actions: { label: string; action: string }[] = [];

  /** Evento que emite cuando se ejecuta una acción */
  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();

  onAction(action: string, row: any) {
    this.actionClick.emit({ action, row });
  }

}
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';

import { ColumnConfig } from '@app/shared';

@Component({
  selector    : 'app-custom-table',
  templateUrl : './custom-table.component.html',
  styleUrl    : './custom-table.component.css',
  imports     : [CommonModule],
})
export class CustomTableComponent {

  /** Datos del cuerpo */
  @Input() data: any[] = [];

  /** Título o caption */
  @Input() caption: string = '';

  /** Indica si está cargando */
  isLoading = input.required<boolean>();

  /** Claves de los datos que corresponden a cada columna */
  columns = input.required<ColumnConfig[]>();

  /** Evento que emite cuando se ejecuta una acción */
  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();

  onAction(action: string, row: any) {
    this.actionClick.emit({ action, row });
  }
  
  getValueByPath(obj: any, path: string): any {
    if (!obj || !path) return undefined;
    return path.split('.').reduce((acc, key) => (acc != null ? acc[key] : undefined), obj);
  }

  formatCell(row: any, column: ColumnConfig): string {
    const raw = this.getValueByPath(row, column.key);
    switch (column.type) {
      case 'date':
        return raw ? new Date(raw).toLocaleDateString() : '';
      case 'booleanBadge':
        return raw ? 'true' : 'false';
      case 'text':
      default:
        return this.formatDisplay(raw);
    }
  }

  /** Formatea para mostrar: concatena firstName + lastName si es objeto de usuario */
  formatDisplay(value: any): string {
    if (value == null) return '';
    if (typeof value === 'object') {
      const fn = value.firstName;
      const ln = value.lastName;
      if (fn || ln) return `${fn ?? ''} ${ln ?? ''}`.trim();

      const desc = value.description;
      if (desc) return desc;
      return '';
    }
    return String(value);
  }
}
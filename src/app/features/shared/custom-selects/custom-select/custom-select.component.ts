import { Component, EventEmitter, input, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'custom-select',
  styleUrl: './custom-select.component.css',
  templateUrl: './custom-select.component.html',
})
export class CustomSelectComponent {
  /** Lista de usuarios disponibles */
  @Input({ required: true }) users: any[] = [];

  /** Lista de IDs seleccionados */
  @Input() selected = signal<string[]>([]);

  /** Texto mostrado cuando no hay selección */
  placeholder = input.required<string>();

  /** Evento que emite cuando cambian las selecciones */
  @Output() selectionChange = new EventEmitter<string>();

  /** Obtener usuario por ID */
  getUserById(id: string): any | null {
    return this.users.find(u => u.idUser+'' === id) ?? null;
  }

  /** Alternar selección */
  onToggleUser(idUser: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.selected();
    const updated = checked ? [...current, idUser] : current.filter( (id:any) => id !== idUser);
    this.selected.set(updated);
    this.selectionChange.emit(updated.join(','));
  }
}
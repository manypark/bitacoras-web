import { Component, EventEmitter, input, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'custom-select-menus',
  templateUrl: './custom-select-menus.component.html',
})
export class CustomSelectMenusComponent {
  /** Lista de usuarios disponibles */
  @Input({ required: true }) menus: any[] = [];

  /** Lista de IDs seleccionados */
  @Input() selected = signal<string[]>([]);

  /** Texto mostrado cuando no hay selección */
  placeholder = input.required<string>();

  /** Evento que emite cuando cambian las selecciones */
  @Output() selectionChange = new EventEmitter<string>();

  /** Obtener usuario por ID */
  getMenuById(id: string): any | null {
    return this.menus.find(u => u.idMenu+'' === id) ?? null;
  }

  /** Alternar selección */
  onToggleUser(idMenu: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.selected();
    const updated = checked ? [...current, idMenu] : current.filter( (id:any) => id !== idMenu);
    this.selected.set(updated);
    this.selectionChange.emit(updated.join(','));
  }
}
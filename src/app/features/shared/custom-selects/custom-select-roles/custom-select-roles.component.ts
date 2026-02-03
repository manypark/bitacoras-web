import { Component, EventEmitter, input, Input, Output, signal } from '@angular/core';

@Component({
  selector    : 'custom-select-roles',
  styleUrl    : './custom-select-roles.component.css',
  templateUrl : './custom-select-roles.component.html',
})
export class CustomSelectRolesComponent {
  /** Lista de usuarios disponibles */
  @Input({ required: true }) roles: any[] = [];

  /** Lista de IDs seleccionados */
  @Input() selected = signal<string[]>([]);

  /** Texto mostrado cuando no hay selección */
  placeholder = input.required<string>();

  /** Evento que emite cuando cambian las selecciones */
  @Output() selectionChange = new EventEmitter<string>();

  /** Obtener usuario por ID */
  getUserById( id:string ): any | null {
    return this.roles.find(u => u.idRoles+'' === id) ?? null;
  }

  /** Alternar selección */
  onToggleUser(idRoles: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.selected();
    const updated = checked ? [...current, idRoles] : current.filter( (id:any) => id !== idRoles);
    this.selected.set(updated);
    this.selectionChange.emit(updated.join(','));
  }
}
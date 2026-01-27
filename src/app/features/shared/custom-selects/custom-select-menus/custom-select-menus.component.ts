import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { MenuEntity, MenuListResponseEntity } from '@app/roles/domain';

@Component({
  selector: 'custom-select-menus',
  templateUrl: './custom-select-menus.component.html',
})
export class CustomSelectMenusComponent {
  /** Lista de usuarios disponibles */
  @Input({ required: true }) menus: MenuListResponseEntity[] = [];

  /** Lista de IDs seleccionados */
  @Input() selected:MenuEntity[] = [];

  /** Texto mostrado cuando no hay selección */
  placeholder = input.required<string>();

  /** Evento que emite cuando cambian las selecciones */
  @Output() selectionChange = new EventEmitter<any>();

  /** Obtener usuario por ID */
  getMenuById(id:number): any | null {
    return this.menus.find(u => u.idMenu === id) ?? null;
  }

  getCheckedMenuList( idMenu:number ) {
    return this.selected.map( select => select.idMenu).includes(idMenu);
  }

  /** Alternar selección */
  onToggleUser( menu:MenuEntity, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.selected;
    const updated = checked ? [...current, menu] : current.filter( (menuC) => menuC.idMenu !== menu.idMenu );
    this.selected = updated;
    this.selectionChange.emit( updated );
  }
}
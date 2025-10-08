import { Injectable, computed, signal } from '@angular/core';

import { RolesEntity } from '@app/roles/domain';

@Injectable({ providedIn: 'root' })
export class RoleSelectionService {

  /** Signal privado: almacena el rol actual o null */
  private readonly _selectedRole = signal<RolesEntity | null>(null);

  /** Signal computado: exposición pública solo lectura */
  readonly selectedRole = computed( () => this._selectedRole() );

  /** Establece el rol seleccionado */
  setSelectedRole(role: RolesEntity) {
    this._selectedRole.set(role);
  }

  /** Limpia el rol seleccionado */
  clearSelectedRole() {
    this._selectedRole.set(null);
  }
}
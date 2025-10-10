import { FormsModule } from '@angular/forms';
import { Component, computed, effect, inject, resource, signal } from '@angular/core';

import { ToastService } from '@app/shared/toast';
import { CustomTableComponent } from "@app/shared";
import { GetAllRoles, ROLES_KEYS, RolesEntity } from '@app/roles/domain';
import { RoleSelectionService } from '@app/roles/presentation/signals';
import { EditDialogComponent, DeleteDialogComponent, CreateDialogComponent } from "../../components";

@Component({
  selector    : 'app-roles',
  imports: [
    FormsModule,
    CustomTableComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    CreateDialogComponent
],
  templateUrl : './roles.component.html',
  styleUrl    : './roles.component.css',
})
export default class RolesComponent {

  // 🧠 Signals principales
  roles = signal<RolesEntity[]>([]);
  searchRol = signal<string>('');

  private getAllRolesUSecase = inject(GetAllRoles);
  private toast = inject(ToastService);
  private roleSelectedServices = inject(RoleSelectionService);

  // 🔢 Paginación
  page = signal(1);
  keys = ROLES_KEYS;

  // 🔍 Filtro local
  filteredRoles = computed( () => {
    const search = this.searchRol().toLowerCase().trim();
    if (!search) return this.roles();
    return this.roles().filter( role => role.name.toLowerCase().includes(search) );
  });

  readonly updateResource = resource({
    params: () => this.page(),
    loader: async ( page ) => {
      this.roles.set([]);
      return this.getAllRolesUSecase.execute( 5, (this.page() - 1) * 5  );
    },
  });

  constructor() {
    effect(() => {

      const data = this.updateResource?.value()?.data;

      if (data) {
        this.roles.set( this.updateResource.value()?.data ?? [] );
        this.toast.success('Petición exitosa', 'Roles cargados correctamente');
      }

      if (this.updateResource.error()) {
        this.toast.error('Petición fallida', this.updateResource.value()?.message ?? 'Hubo algún error');
      }
    });
  }

  nextPage() {
    this.page.update(p => p + 1);
  }

  prevPage() {
    if (this.page() > 1) this.page.update(p => p - 1);
  }

  openCreateDialog() {
    const modal = document.getElementById('custom-create-role') as HTMLDialogElement | null;
    modal?.showModal();
  }

  onTableAction(event: { action: string; row: RolesEntity }) {
    const modalId = event.action === 'edit' ? 'custom-edit-role' : event.action === 'delete' ? 'custom-delete-role': null;

    if (modalId) {
      const modal = document.getElementById(modalId) as HTMLDialogElement | null;
      this.roleSelectedServices.setSelectedRole(event.row);
      modal?.showModal();
    }
  }

  retryGetAllRoles( value:boolean ) {
    if(value) {
      this.roles.set([]);
      this.updateResource.reload();
    }
  }
}
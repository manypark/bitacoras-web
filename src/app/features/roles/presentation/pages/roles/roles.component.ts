import { FormsModule } from '@angular/forms';
import { Component, computed, inject, resource, signal } from '@angular/core';

import { ColumnConfig, CustomTableComponent } from "@app/shared";
import { PaginationComponent } from "../../components/pagination";
import { RoleSelectionService } from '@app/roles/presentation/signals';
import { GetAllRolesUsecase, GetAllRolesInfo, RolesEntity } from '@app/roles/domain';
import { TitleDescriptionCustomButtonComponent, TotalsInfoComponent } from '@app/shared/containers';
import { 
  EditDialogComponent, 
  DeleteDialogComponent, 
  CreateDialogComponent, 
} from "../../components";

@Component({
  selector    : 'app-roles',
  imports: [
    FormsModule,
    PaginationComponent,
    EditDialogComponent,
    CustomTableComponent,
    DeleteDialogComponent,
    CreateDialogComponent,
    TotalsInfoComponent,
    TitleDescriptionCustomButtonComponent,
],
  templateUrl : './roles.component.html',
  styleUrl    : './roles.component.css',
})
export default class RolesComponent {

  // #=============== dependencias ===============#
  private getAllRolesUsecase = inject(GetAllRolesUsecase);
  private getAllRolesUSecaseInfo = inject(GetAllRolesInfo);
  private roleSelectedServices = inject(RoleSelectionService);

  // #=============== variables ===============#
  page = signal(1);
  searchRol = signal<string>('');
  rolesInfo = this.getAllRolesUSecaseInfo.execute();
  columns:ColumnConfig[] = [
    { key: 'idRoles', header: 'ID', type: 'text' },
    { key: 'name', header: 'Nombre', type: 'text' },
    { key: 'active', header: 'Estatus', type: 'booleanBadge' }
  ];
  filteredRoles = computed( () => {
    const search = this.searchRol().toLowerCase().trim();
    if (!search) return (this.updateResource.value()?.data ?? [] );
    return (this.updateResource.value()?.data ?? [] ).filter( role => role.name.toLowerCase().includes(search) );
  });

  // #=============== resource ===============#
  readonly updateResource = resource({
    params: () => this.page(),
    loader: () => this.getAllRolesUsecase.execute( 5, (this.page() - 1) * 5  ),
  });

  // #=============== funciones ===============#
  nextPage() { this.page.update(p => p + 1); }

  prevPage() { if (this.page() > 1) this.page.update(p => p - 1); }

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
      this.updateResource.reload();
      this.rolesInfo.reload();
    }
  }
}
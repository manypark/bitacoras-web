import { Component, inject } from '@angular/core';

import { RoleSelectionService } from '@app/roles/presentation/signals';

@Component({
  selector    : 'custom-dialog',
  imports     : [],
  templateUrl : './custom-dialog.component.html',
  styleUrl    : './custom-dialog.component.css',
})
export class CustomDialogComponent {

  roleSelectedServices = inject(RoleSelectionService);

  closeModal() {
    const modal = document.getElementById('custom-edit-role') as HTMLDialogElement | null;
    modal?.close();
    this.roleSelectedServices.clearSelectedRole();
  }

}
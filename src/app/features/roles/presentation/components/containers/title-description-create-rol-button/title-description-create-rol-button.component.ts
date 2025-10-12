import { Component } from '@angular/core';

@Component({
  selector    : 'title-description-create-rol-button',
  template: `
    <div class="flex justify-between mb-12">

    <div class="flex flex-col gap-y-2">
      <h1 class="font-bold text-4xl">Gestión de roles</h1>
      <p> Crear, administrar y controlar roles.</p>
    </div>

    <div class="flex">
      <button class="btn h-12 text-base font-bold" (click)="openCreateDialog()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z">
          </path>
        </svg>
        Crear Rol
      </button>
    </div>

  </div>
  `
})
export class TitleDescriptionCreateRolButtonComponent {
  openCreateDialog() {
    const modal = document.getElementById('custom-create-role') as HTMLDialogElement | null;
    modal?.showModal();
  }
}
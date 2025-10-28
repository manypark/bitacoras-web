import { Component, input } from '@angular/core';

@Component({
  selector    : 'title-description-custom-button',
  template: `
    <div class="flex justify-between mb-12">

    <div class="flex flex-col gap-y-2">
      <h1 class="font-bold text-4xl"> {{ title() }} </h1>
      <p> {{ description() }} </p>
    </div>

    <div class="flex w-56">
      <button class="btn btn-primary w-full h-12 text-base font-bold" (click)="openDialog()">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z">
          </path>
        </svg>
        {{ buttonName() }}
      </button>
    </div>

  </div>
  `,
  imports: []
})
export class TitleDescriptionCustomButtonComponent {

  title = input.required<string>();
  buttonName = input.required<string>();
  description = input.required<string>();
  idModal = input.required<string>();

  openDialog() {
    const modal = document.getElementById(`${this.idModal()}`) as HTMLDialogElement | null;
    modal?.showModal();
  }
}
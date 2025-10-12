import { Component, input, output } from '@angular/core';

@Component({
  selector    : 'pagination',
  template    : ` 
    <nav role="navigation" aria-label="pagination" class="mx-auto flex w-full mt-2 justify-end">
      <ul class="flex flex-row items-center gap-1">
        <li>
          <button
            class="btn-ghost flex items-center gap-1"
            [disabled]="page() === 1"
            (click)="onPrev()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9142 12L18.7071 7.20712L17.2929 5.79291L11.0858 12L17.2929 18.2071L18.7071 16.7929L13.9142 12ZM7 18V6.00001H9V18H7Z"></path></svg>
            Anterior
          </button>
        </li>
        <li>
          <span class="btn-icon-outline">{{ page() }}</span>
        </li>
        <li>
          <button
            class="btn-ghost flex items-center gap-1"
            [disabled]="hasNextPage()"
            (click)="onNext()">
            Siguiente
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.0858 12L5.29289 16.7929L6.70711 18.2071L12.9142 12L6.70711 5.79291L5.29289 7.20712L10.0858 12ZM17 6.00002L17 18H15L15 6.00002L17 6.00002Z"></path></svg>
          </button>
        </li>
      </ul>
  </nav>`
})
export class PaginationComponent {
  
  // Input obligatorio de la página actual
  readonly page = input.required<number>();

  // Input que indica si existe una siguiente página
  readonly hasNextPage = input<boolean>(false);

  // Output para avanzar
  readonly next = output<void>();

  // Output para retroceder
  readonly prev = output<void>();

  onNext(): void { this.next.emit(); }

  onPrev(): void { this.prev.emit(); }
}
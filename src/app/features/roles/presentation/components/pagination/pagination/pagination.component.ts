import { Component, input, output } from '@angular/core';

@Component({
  selector    : 'pagination',
  template    : `
  <div class="join mx-auto flex w-full mt-2 justify-end"> 
    <button
      class="join-item btn"
      [disabled]="page() === 1"
      (click)="onPrev()">
      «
    </button>
      <button class="join-item btn"> Pagina {{ page() }} </button>
    <button
      class="join-item btn"
      [disabled]="hasNextPage()"
      (click)="onNext()">
      »
    </button>
  </div>`
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
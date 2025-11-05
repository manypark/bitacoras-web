import { Component, EventEmitter, input, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'custom-select-concept',
  styleUrl: './custom-select-concepts.component.css',
  templateUrl: './custom-select-concepts.component.html',
})
export class CustomSelectConceptsComponent {
  /** Lista de usuarios disponibles */
  @Input({ required: true }) data: any[] = [];

  /** Lista de IDs seleccionados */
  @Input() selected = signal<string[]>([]);

  /** Texto mostrado cuando no hay selección */
  placeholder = input.required<string>();

  /** Evento que emite cuando cambian las selecciones */
  @Output() selectionChange = new EventEmitter<string>();

  /** Obtener usuario por ID */
  getUserById(id: string): any | null {
    return this.data.find(u => u.idConcept+'' === id) ?? null;
  }

  /** Alternar selección */
  onToggleUser(idConcept: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.selected();
    const updated = checked ? [...current, idConcept] : current.filter( (id:any) => id !== idConcept);
    this.selected.set(updated);
    this.selectionChange.emit(updated.join(','));
  }
}
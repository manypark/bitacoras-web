import { computed, Injectable, signal } from '@angular/core';

import { ConceptEntity } from '@app/concepts/domain';

@Injectable({ providedIn: 'root' })
export class ConceptSelectedService {

  private readonly _selectedConcept = signal<ConceptEntity | null>(null);

  readonly selectedConcept = computed( () => this._selectedConcept() );

  setSelectedConcept( concept:ConceptEntity ) {
    this._selectedConcept.set( concept );
  }

  clearSelectedConcept() {
    this._selectedConcept.set(null);
  }

  updateSelectedConcept( partial:Partial<ConceptEntity> ) {
    const current = this._selectedConcept();
    if(!current) return;

    this._selectedConcept.set({
      ...current,
      ...partial
    });
  }

}
import { FormsModule } from '@angular/forms';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Component, computed, inject, signal } from '@angular/core';

import { PaginationComponent } from "@app/roles/presentation/components";
import { ConceptSelectedService } from '@app/concepts/presentation/signals';
import { ColumnConfig, CustomTableComponent } from "@app/shared";
import { ConceptEntity, GetAllConceptUsecase, GetConceptInfoUsecase } from '@app/concepts/domain';
import { TitleDescriptionCustomButtonComponent, TotalsInfoComponent } from '@app/shared/containers';
import { CreateDialogComponent, UpdateDialogConceptComponent, DeleteDialogConceptComponent } from "../../components/dialogs";

@Component({
  selector    : 'app-concepts',
  imports: [
    FormsModule,
    TotalsInfoComponent,
    CreateDialogComponent,
    CustomTableComponent,
    PaginationComponent,
    UpdateDialogConceptComponent,
    DeleteDialogConceptComponent,
    TitleDescriptionCustomButtonComponent,
],
  templateUrl : './concepts.component.html',
  styleUrl    : './concepts.component.css',
})
export default class ConceptsComponent {

  // #=============== dependencias ===============#
  private readonly getConceptsUsecase = inject(GetAllConceptUsecase);
  private readonly getConceptsInfoUsecase = inject(GetConceptInfoUsecase);
  private readonly conceptSelectedServices = inject(ConceptSelectedService);
  conceptsInfo = this.getConceptsInfoUsecase.execute();

  // #=============== variables ===============#
  columns:ColumnConfig[] = [
    { key: 'idConcept', header: 'ID', type: 'text' },
    { key: 'description', header: 'Descripción', type: 'text' },
    { key: 'active', header: 'Estatus', type: 'booleanBadge' }
  ];
  page = signal(1);
  searchConcepts = signal<string>('');
  filteredConcepts = computed( () => {
    const search = this.searchConcepts().toLowerCase().trim();
    const dataConcepts = this.getConceptsQuery.data()?.data ?? [];
    if (!search) return dataConcepts;
    return dataConcepts.filter( role => role.description.toLowerCase().includes(search) );
  });

  // #=============== queries ===============#
  readonly getConceptsQuery = injectQuery( () => ({
    queryKey: [ 'concepts', this.page() ],
    queryFn : () => this.getConceptsUsecase.execute( 5, (this.page() - 1) * 5  ),
  }));

  // #=============== functions ===============#
  onTableAction(event: { action: string; row: ConceptEntity }) {
    const modalId = event.action === 'edit' ? 'custom-edit-concept' : event.action === 'delete' ? 'custom-delete-concept': null;
    if (modalId) {
      const modal = document.getElementById(modalId) as HTMLDialogElement | null;
      this.conceptSelectedServices.setSelectedConcept(event.row);
      modal?.showModal();
    }
  }

  nextPage() { this.page.update(p => p + 1); }

  prevPage() { if (this.page() > 1) this.page.update(p => p - 1); }

  retryGetAllRoles( value:boolean ) {
    if(value) {
      this.getConceptsQuery.refetch();
      this.conceptsInfo.reload();
    }
  }
}
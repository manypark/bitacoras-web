import { FormsModule } from '@angular/forms';
import { Component, computed, effect, inject, resource, signal } from '@angular/core';

import { CustomTableComponent, ToastService } from "@app/shared";
import { CreateDialogComponent } from "../../components/dialogs";
import { TitleDescriptionCustomButtonComponent, TotalsInfoComponent } from '@app/shared/containers';
import { ConceptEntity, CONCEPTS_KEYS, GetAllConceptUsecase, GetConceptInfoUsecase } from '@app/concepts/domain';
import { PaginationComponent } from "@app/roles/presentation/components";

@Component({
  selector    : 'app-concepts',
  imports: [
    FormsModule,
    TotalsInfoComponent,
    CreateDialogComponent,
    CustomTableComponent,
    TitleDescriptionCustomButtonComponent,
    PaginationComponent
],
  templateUrl : './concepts.component.html',
  styleUrl    : './concepts.component.css',
})
export default class ConceptsComponent {

  // #=============== dependencias ===============#
  private readonly toast = inject(ToastService);
  private readonly getConceptsUsecase = inject(GetAllConceptUsecase);
  private readonly getConceptsInfoUsecase = inject(GetConceptInfoUsecase);
  conceptsInfo = this.getConceptsInfoUsecase.execute();

  // #=============== variables ===============#
  keys = CONCEPTS_KEYS;
  page = signal(1);
  searchConcepts = signal<string>('');
  concetps = signal<ConceptEntity[]>([]);
  filteredConcepts = computed( () => {
    const search = this.searchConcepts().toLowerCase().trim();
    if (!search) return this.concetps();
    return this.concetps().filter( role => role.description.toLowerCase().includes(search) );
  });
  
  // #=============== constructor ===============#
  constructor() {
    effect( () => {
      const data = this.getConceptsResource?.value()?.data;

      if (data) {
        this.concetps.set( this.getConceptsResource.value()?.data ?? [] );
        this.toast.success('Petición exitosa', 'Roles cargados correctamente');
      }

      if (this.getConceptsResource.error()) {
        this.toast.error('Petición fallida', this.getConceptsResource.value()?.message ?? 'Hubo algún error');
      }
    });
  }

  // #=============== resources ===============#
  readonly getConceptsResource = resource({
    params: () => this.page(),
    loader: async () => {
      this.concetps.set([]);
      return this.getConceptsUsecase.execute( 5, (this.page() - 1) * 5  );
    },
  });

  // #=============== functions ===============#
  onTableAction(event: { action: string; row: ConceptEntity }) {
    const modalId = event.action === 'edit' ? 'custom-edit-role' : event.action === 'delete' ? 'custom-delete-role': null;
    if (modalId) {
      const modal = document.getElementById(modalId) as HTMLDialogElement | null;
      modal?.showModal();
    }
  }

  nextPage() { this.page.update(p => p + 1); }

  prevPage() { if (this.page() > 1) this.page.update(p => p - 1); }

  retryGetAllRoles( value:boolean ) {
    if(value) {
      this.concetps.set([]);
      this.getConceptsResource.reload();
      this.conceptsInfo.reload();
    }
  }
  
}
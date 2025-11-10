import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { GetRolesInfoUsecase } from '@app/dashboards/domain';

@Component({
  selector: 'roles-info',
  template    :`
  <h2 class="text-red-500 font-bold text-xl"> {{ rolesInfo.error()?.message }} </h2>
  @if ( rolesInfo.isLoading() ) { 
      <div class="flex flex-col 2xl:flex-row justify-between gap-6 mb-6">
          @for (item of [1]; track $index) {
              <div class="flex w-full 2xl:w-96">
                  <div class="card border-0 shadow-md p-6 w-full">
                      <section class="px-0 flex flex-row justify-between items-center">
                      <div class="flex flex-col space-y-2">
                          <div class="h-4 w-40 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
                          <div class="h-6 w-24 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
                      </div>
                      <div class="w-12 h-12 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
                      </section>
                  </div>
              </div>
          }
      </div>
  }

  @if ( rolesInfo.data() && !rolesInfo.isLoading()) {
      <div class="flex flex-col xl:flex-row justify-between gap-6 mb-6 xl:[@media(max-width:1400px)]:flex-col">
          
          <div class="flex w-full xl:w-96">
              <div class="card p-4 border border-gray-100 shadow-md px-6 w-full">
                  <section class="px-0 flex flex-row justify-between items-center">
                  <div>
                      <h2 class="text-xl font-bold text-gray-500">Roles totales</h2>
                      <span class="text-3xl">{{ rolesInfo.data()?.data?.totals }}</span>
                  </div>
                  <div class="w-12 h-12 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 21V23.5L10 21.5L7 23.5V21H6.5C4.567 21 3 19.433 3 17.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V20C21 20.5523 20.5523 21 20 21H13ZM13 19H19V16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19H7V17H13V19ZM19 14V4H6V14.0354C6.1633 14.0121 6.33024 14 6.5 14H19ZM7 5H9V7H7V5ZM7 8H9V10H7V8ZM7 11H9V13H7V11Z"></path></svg>
                  </div>
                  </section>
              </div>
          </div>
      </div>
  }`
})
export class RolesInfoComponent {
  // #=============== dependencias ==============#
  private readonly rolesInfoUsecase = inject(GetRolesInfoUsecase);

  // #=============== query ==============#
  rolesInfo = injectQuery( () => ({
    queryKey: ['rolesInfo'],
    queryFn : () => this.rolesInfoUsecase.execute(),
  }));
}
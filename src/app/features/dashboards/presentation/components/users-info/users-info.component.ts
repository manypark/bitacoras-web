import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { GetUsersInfoUsecase } from '@app/dashboards/domain';

@Component({
  selector    : 'users-info',
  template    :`
  <h2 class="text-red-500 font-bold text-xl"> {{ usersInfo.error()?.message }} </h2>
  @if ( usersInfo.isLoading() ) { 
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

  @if ( usersInfo.data() && !usersInfo.isLoading()) {
      <div class="flex flex-col xl:flex-row justify-between gap-6 mb-6 xl:[@media(max-width:1400px)]:flex-col">
          
          <div class="flex w-full xl:w-96">
              <div class="card p-4 border border-gray-100 shadow-md px-6 w-full">
                  <section class="px-0 flex flex-row justify-between items-center">
                  <div>
                      <h2 class="text-xl font-bold text-gray-500">Usuarios totales</h2>
                      <span class="text-3xl">{{ usersInfo.data()?.data?.totals }}</span>
                  </div>
                  <div class="w-12 h-12 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM17.3628 15.2332C20.4482 16.0217 22.7679 18.7235 22.9836 22H20C20 19.3902 19.0002 17.0139 17.3628 15.2332ZM15.3401 12.9569C16.9728 11.4922 18 9.36607 18 7C18 5.58266 17.6314 4.25141 16.9849 3.09687C19.2753 3.55397 21 5.57465 21 8C21 10.7625 18.7625 13 16 13C15.7763 13 15.556 12.9853 15.3401 12.9569Z"></path></svg>
                  </div>
                  </section>
              </div>
          </div>
      </div>
  }` 
})
export class UsersInfoComponent {
  // #=============== dependencias ==============#
  private readonly usersInfoUsecase = inject(GetUsersInfoUsecase);

  // #=============== query ==============#
  usersInfo = injectQuery( () => ({
    queryKey: ['usersInfo'],
    queryFn : () => this.usersInfoUsecase.execute(),
  }));
}
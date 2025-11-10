import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { GetTasksInfoUsecase } from '@app/dashboards/domain';

@Component({
  selector    : 'tasks-info',
  template    :`
  <h2 class="text-red-500 font-bold text-xl"> {{ tasksInfo.error()?.message }} </h2>
  @if ( tasksInfo.isLoading() ) { 
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

  @if ( tasksInfo.data() && !tasksInfo.isLoading()) {
      <div class="flex flex-col xl:flex-row justify-between gap-6 mb-6 xl:[@media(max-width:1400px)]:flex-col">
          
          <div class="flex w-full xl:w-96">
              <div class="card p-4 border border-gray-100 shadow-md px-6 w-full">
                  <section class="px-0 flex flex-row justify-between items-center">
                  <div>
                      <h2 class="text-xl font-bold text-gray-500">Tareas totales</h2>
                      <span class="text-3xl">{{ tasksInfo.data()?.data?.totals }}</span>
                  </div>
                  <div class="w-12 h-12 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H7V0H9V2H15V0H17V2ZM17 4V6H15V4H9V6H7V4H5V20H19V4H17ZM7 8H17V10H7V8ZM7 12H17V14H7V12Z"></path></svg>
                  </div>
                  </section>
              </div>
          </div>
      </div>
  }` 
})
export class TasksInfoComponent {
  // #=============== dependencias ==============#
  private readonly tasksInfoUsecase = inject(GetTasksInfoUsecase);

  // #=============== query ==============#
  tasksInfo = injectQuery( () => ({
    queryKey: ['tasksInfo'],
    queryFn : () => this.tasksInfoUsecase.execute(),
  }));
}

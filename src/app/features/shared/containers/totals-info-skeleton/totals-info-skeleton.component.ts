import { Component } from '@angular/core';

@Component({
  selector: 'totals-info-skeleton',
  template: `
      <div class="flex flex-col 2xl:flex-row justify-between gap-6 mb-6">
        @for (item of [1,2,3]; track $index) {
        <div class="flex w-full 2xl:w-96">
        <div class="card shadow-lg px-6 w-full">
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
`
})
export class TotalsInfoSkeletonComponent { }
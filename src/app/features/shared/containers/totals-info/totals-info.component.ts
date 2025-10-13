import { Component, input } from '@angular/core';

import { TotalsInfoSkeletonComponent } from '@app/shared/containers';

@Component({
  selector    : 'totals-info',
  imports     : [ TotalsInfoSkeletonComponent ],
  templateUrl : './totals-info.component.html',
  styleUrl    : './totals-info.component.css',
})
export class TotalsInfoComponent {
  data = input.required() as any;
}

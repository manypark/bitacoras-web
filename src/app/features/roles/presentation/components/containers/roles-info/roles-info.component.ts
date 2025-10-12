import { Component, input } from '@angular/core';
import { HttpResourceRef } from '@angular/common/http';

import { ApiResponse } from '@utils/api_response';
import { RolesInfoEntity } from '@app/roles/domain';
import { RolesInfoSkeletonComponent } from "../roles-info-skeleton";

@Component({
  selector    : 'roles-info',
  imports     : [ RolesInfoSkeletonComponent ],
  templateUrl : './roles-info.component.html',
  styleUrl    : './roles-info.component.css',
})
export class RolesInfoComponent {
  rolesInfo = input.required<HttpResourceRef<ApiResponse<RolesInfoEntity>>>();
}

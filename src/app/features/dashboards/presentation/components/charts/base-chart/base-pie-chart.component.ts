import { computed } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { CreateQueryResult, injectQuery } from '@tanstack/angular-query-experimental';

import { ApiResponse } from '@utils/api_response';
import { GeneralInfoEntity } from '@app/dashboards/domain/entities';

Chart.register(...registerables);

export abstract class BasePieChartComponent {

    query?:CreateQueryResult<ApiResponse<GeneralInfoEntity>, Error>;

    protected abstract queryKey(): string[];
    protected abstract queryFn(): Promise<ApiResponse<GeneralInfoEntity>>;
    protected abstract getLabel(): string;

    protected getBackgroundColors(): string[] {
        return [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
        ];
    }

    constructor() {
        this.query = injectQuery(() => ({
            queryKey: this.queryKey(),
            queryFn : () => this.queryFn(),
        }));
    }

    barChartData = computed<ChartConfiguration<'pie'>['data']>( () => {

        const actives   = this.query!.data()?.data.actives ?? 0;
        const inactives = this.query!.data()?.data.inactives ?? 0;

        return {
            labels    : ['Activos', 'Inactivos'],
            datasets  : [{
                data            : [actives, inactives],
                label           : this.getLabel(),
                backgroundColor : this.getBackgroundColors(),
            }],
        };
    });
}
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {ChartGeneratorService} from '../services/chart-generator.service';
import {addChartDataSuccess, DashBoardActionsEnum, ErrorDashboardAction} from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private chartGen: ChartGeneratorService
  ) {
  }

  addChart$ =
    createEffect(() => {
        return this.actions$.pipe(
          ofType(DashBoardActionsEnum.addChartData),
          exhaustMap((action) => {
            const {name} = action;
            return of(this.chartGen.generateChartData(100, new Date('2019-01-01'), new Date('2019-12-31'), name, 'line', 'red'))
              .pipe(
                map(chart => (addChartDataSuccess({chart}))),
                catchError((error: Error) => of(ErrorDashboardAction({error}))));
          })
        );
      }
    );
}

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import {catchError, exhaustMap, map, mergeMap} from 'rxjs/operators';
import {ChartGeneratorService} from '../services/chart-generator.service';
import {DashBoardActionsEnum} from './dashboard.actions';

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
            console.log(action);
            const {name} = action;
            console.log('payload ' + name)
            return of(this.chartGen.generateChart(100, new Date('1800-01-01'), new Date('2100-01-01'), name))
              .pipe(
                map(chart => ({type: DashBoardActionsEnum.addChartDataSuccess, chart})),
                catchError(() => EMPTY)
              );
          })
        );
      }
    );
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChartComponent} from './chart/chart.component';
import {TopbarComponent} from './topbar/topbar.component';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import * as dashBoardReducer from './redux/dashboard.reducer';
import {EffectsModule} from '@ngrx/effects';
import * as DashBoardEffects from './redux/dashboard.effects';
import {DashboardEffects} from './redux/dashboard.effects';
import {dashboardFeatureKey, reducers} from './redux/dashboard.reducer';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent}
    ]),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([DashboardEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

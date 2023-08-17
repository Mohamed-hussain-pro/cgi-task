import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { MeasurementComponent } from './measurement/measurement.component';

const routes: Routes = [
  
  
  { path: 'dashboard', component: MainDashboardComponent },
  { path: 'machines', component: BarChartComponent },
  { path: 'measurement', component: MeasurementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MeasurementComponent } from './measurement/measurement.component';

const routes: Routes = [
  
  
  { path: 'dashboard', component: LineChartComponent },
  { path: 'machines', component: BarChartComponent },
  { path: 'measurement', component: MeasurementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

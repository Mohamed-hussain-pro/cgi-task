import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { MeasurementComponent } from './components/measurement/measurement.component';

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

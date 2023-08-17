import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { MeasurementComponent } from './measurement/measurement.component';

const routes: Routes = [
  
  
  { path: 'dashboard', component: MainDashboardComponent },

  { path: 'measurement', component: MeasurementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

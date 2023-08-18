import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MeasurementComponent } from './measurement/measurement.component';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { CollapseModule } from 'ngx-bootstrap/collapse'; // Import CollapseModule

@NgModule({
  declarations: [
    AppComponent,
    MeasurementComponent,
    BarChartComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatIconModule,
    RouterModule,
    MatTableModule,
    CollapseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

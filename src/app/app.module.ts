import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MeasurementComponent } from './components/measurement/measurement.component';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NavbarComponent } from './components/navbar/navbar.component'; // Import CollapseModule

@NgModule({
  declarations: [
    AppComponent,
    MeasurementComponent,
    BarChartComponent,
    LineChartComponent,
    NavbarComponent
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

import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service/http-service.service';


@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss']
})
export class MeasurementComponent implements OnInit {

  displayedColumns: string[] = ['name', 'date', 'weight'];
  dataSource = [];
  events: any[] = [];

  constructor(private httpServiceService: HttpServiceService) {}
  
  ngOnInit(): void {
    this.httpServiceService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  /**
   * 
   * Listing of All Measurements Where a Value of 90 Was Exceeded
   * This function filters the data to get a list of all measurements where the temperature value exceeded 90.
   */
   measurementsExceedingValue(data: any[], threshold: number): any[] {
    return data.filter((event) => event.temperature > threshold);
  }
}

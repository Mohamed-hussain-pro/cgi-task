import { Injectable, OnInit } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public events: any[] = [];


  constructor(private httpServiceService: HttpServiceService) {}

  ngOnInit(): void {
    this.httpServiceService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }
  

  getData(){
    this.httpServiceService.getEvents().subscribe((data) => {
      this.events = data;      
      console.log(data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    return this.events;
  }

  /**
   * Average Temperature of All Machines Over Time
   * This function calculates the average temperature of all machines over time.
   */
   averageTemperatureOverTime(): number {
    const totalTemperature = this.events.reduce((sum, event) => sum + event.temperature, 0);
    return totalTemperature / this.events.length;
  }

}

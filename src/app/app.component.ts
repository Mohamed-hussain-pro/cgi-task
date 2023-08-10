import { Component } from '@angular/core';
import { HttpServiceService } from './http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CGI';

  events: any[] = [];

  constructor(private httpServiceService: HttpServiceService) {}

  ngOnInit(): void {
    this.httpServiceService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  /**
   * Average Temperature of All Machines Over Time
   * This function calculates the average temperature of all machines over time.
   */
   averageTemperatureOverTime(data: any[]): number {
    const totalTemperature = data.reduce((sum, event) => sum + event.temperature, 0);
    return totalTemperature / data.length;
  }

  /**
   * Readings for Individual Machines Over Time
   * This function filters the data to get readings for a specific machine over time.
   */
  readingsForMachine(data: any[], machineId: string): any[] {
    return data.filter((event) => event.machine_id === machineId);
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { map, Observable, tap } from 'rxjs';
import { HttpServiceService } from '../../services/http-service/http-service.service';
import { DataService } from '../../services/data-service/data.service';

DataService
import { EventData } from '../../model/event-data';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnDestroy {

  public chart: any;

  public data: EventData[] = [];

  public months: string[] = [];

  public years: string[] = [];

  public machines: string[] = [];

  public selectedOption: any; // To store the selected option


  selectedMonth: string = 'January';
  selectedYear: string = '2020';
  selectedName: string = 'machine-1';

  constructor(private httpServiceService: HttpServiceService, private dataService: DataService) { }

  ngOnInit(): void {
    this.httpServiceService.getEvents().subscribe((data) => {
      this.createChart(data);
      this.machines = this.dataService.getAllNames(data);
      this.months = this.dataService.getAllMonths(data);
      this.years = this.dataService.getAllYears(data);
    });
  };

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy(); // Clean up the chart when component is destroyed
    }
  };

  createChart(data: any) {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: data.map((row: { timestamp: any; }) => row.timestamp),
        datasets: [
          {
            label: "Temperatures",
            data: data.map((row: { temperature: any; }) => row.temperature),
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              // forces step size to be 25 units
              stepSize: 25
            }

          },

        }
      }

    });
  }

  onSelectOptionMonth(event: any) {
    this.selectedMonth = event.target.value;
    this.handleSelectionChange();
  }

  onSelectOptionYear(event: any) {
    this.selectedYear = event.target.value;
    this.handleSelectionChange();
  }

  onSelectOptionName(event: any) {
    this.selectedName = event.target.value;
    this.handleSelectionChange();
  }

  handleSelectionChange() {
    this.filterEventsByDateAndMachine(this.selectedMonth, this.selectedYear, this.selectedName).subscribe();
  }

  filterEventsByDateAndMachine(
    month: string,
    year: string,
    machineName: string
  ): Observable<EventData[]> {  // Return type changed to Observable

    if (this.chart) {
      this.chart.destroy();
    }

    return this.httpServiceService.getEvents().pipe(  // Using pipe to return an Observable
      map((data: EventData[]) => {
        return data.filter((event: EventData) => {
          const [eventMonth, eventDay, eventYear] = event.timestamp.split('/').map(Number);

          return (
            eventMonth === this.dataService.getMonthFromString(month) &&
            eventYear === parseInt(year, 10) &&
            event.machine_name === machineName
          );
        });
      }),
      tap(filteredData => {
        this.createChart(filteredData);
      })
    );
  }
}

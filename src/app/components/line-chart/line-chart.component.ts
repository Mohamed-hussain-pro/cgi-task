import { Component, OnInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { map, Observable, tap } from 'rxjs';
import { HttpServiceService } from '../../services/http-service/http-service.service';
import { DataService } from '../../services/data-service/data.service';

import { EventData } from '../../model/event-data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})

export class LineChartComponent implements OnInit, OnDestroy {

  public chart: any;

  public data: EventData[] = [];

  public months: string[] = [];

  public years: string[] = [];

  public machines: string[] = [];

  public selectedOption: any; // To store the selected option


  selectedMonth: string = 'January';

  selectedYear: string = '2020';

  constructor(private httpServiceService: HttpServiceService, private dataService: DataService) { }

  ngOnInit(): void {
    this.httpServiceService.getEvents().subscribe((data) => {
      this.createChart(data);
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

    const chartLabels = Object.keys(data);
    const chartData = Object.values(data);

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: chartLabels,
        datasets: [
          {
            label: "Temperatures",
            data: chartData,
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

  handleSelectionChange() {
    this.filterEventsByDateAndMachine(this.selectedMonth, this.selectedYear).subscribe();
  }

  filterEventsByDateAndMachine(
    month: string,
    year: string
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
            eventYear === parseInt(year, 10)
          );
        });
      }),
      tap(filteredData => {
        let averageTemperatureOverTime = this.calculateAverageTemperatureOverTime(filteredData);
        this.createChart(averageTemperatureOverTime);
      })
    );
  }


  calculateAverageTemperatureOverTime(data: EventData[]): { [timestamp: string]: number } {
    const averageTemperatures: { [timestamp: string]: number } = {};
    const temperatureSumByTimestamp: { [timestamp: string]: { sum: number; count: number } } = {};

    data.forEach((event) => {
      const timestamp = event.timestamp;

      if (!temperatureSumByTimestamp[timestamp]) {
        temperatureSumByTimestamp[timestamp] = { sum: 0, count: 0 };
      }

      temperatureSumByTimestamp[timestamp].sum += event.temperature;
      temperatureSumByTimestamp[timestamp].count += 1;
    });

    for (const timestamp in temperatureSumByTimestamp) {
      const averageTemperature =
        temperatureSumByTimestamp[timestamp].sum / temperatureSumByTimestamp[timestamp].count;
      averageTemperatures[timestamp] = averageTemperature;
    }

    return averageTemperatures;
  }

}

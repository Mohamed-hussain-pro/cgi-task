import { Component, OnInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { map, Observable, tap } from 'rxjs';
import { DataService } from '../data.service';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  public chart: any;

  public data: EventData[] = [];

  public months: string[] = [];
  public years: string[]  = [];

  public machines: string[] = [];
  public values = ['88', '45', '22', '55', '11'];

  public selectedOption: any; // To store the selected option


  selectedMonth: string = 'January';
  selectedYear: string = '2020';
  selectedName: string = 'machine-1';

  constructor(private httpServiceService: HttpServiceService, private dataService: DataService) {}

  ngOnInit(): void {
    this.httpServiceService.getEvents().subscribe((data) => {
      this.createChart(data);
      this.machines = this.getAllNames(data);
      this.months = this.getAllMonths(data);
      this.years = this.getAllYears(data);
    });
  };

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy(); // Clean up the chart when component is destroyed
    }
  };

  /**
   * Average Temperature of All Machines Over Time
   * This function calculates the average temperature of all machines over time.
   */
     getAllNames(data: EventData[]): string[] {
      const machineNames = data.map((row: { machine_name: string; }) => row.machine_name);
      return [...new Set(machineNames)];
    }

  /**
   * Average Temperature of All Machines Over Time
   * This function calculates the average temperature of all machines over time.
   */
     getAllMonths(data: EventData[]): any[] {
      let dates = data.map((row: { timestamp: string; }) => row.timestamp);
      let uniqueDates = [...new Set(dates)];
      
      // Extract months and years
      const monthsArray = uniqueDates.map(date => {
        const [month] = date.split('/');
        return parseInt(month, 10);
      });
      
      // Convert to Set to get unique values
      const uniqueMonths = [...new Set(monthsArray)];

      // Map month numbers to month names
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      // Convert month numbers to month names
      const uniqueMonthNames = uniqueMonths.map(monthNumber => monthNames[monthNumber - 1]);
      
      return uniqueMonthNames;
    }

    /**
   * Average Temperature of All Machines Over Time
   * This function calculates the average temperature of all machines over time.
   */
     getAllYears(data: EventData[]): any[] {
      let dates = data.map((row: { timestamp: string; }) => row.timestamp);
      let uniqueDates = [...new Set(dates)];
      
      // Extract months and years
      const yearsArray = uniqueDates.map(date => {
        const [, year] = date.split('/');
        return parseInt(year, 10);
      });
      
      // Convert to Set to get unique values
      const uniqueYears = [...new Set(yearsArray)];
            
      // Convert year values to human-readable format
      const uniqueYearsFormatted = uniqueYears.map(year => `20${year}`);      

      return  uniqueYearsFormatted;
    }


  createChart(data:any){

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
        aspectRatio:2.5,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              // forces step size to be 50 units
              stepSize: 25
            }
            
          },
         
        }
      }
      
    });
  }
/**
  onSelectOptionName(event: any, data: any[]) {
    this.selectedOption = event.target.value;
    // Additional actions based on the selected option can be performed here
  
    if (data) {

      if (this.chart) {
        this.chart.destroy();
      }

      this.httpServiceService.getEvents().subscribe((data) => {
        this.data = data.filter((event: { machine_name: any; }) => event.machine_name === this.selectedOption);
        this.createChart(this.data);

      });
    } else {
      console.log("Data is not yet available.");
    }
  }

  onSelectOptionYear(event: any, data: any[]) {
    this.selectedOption = event.target.value;
    // Additional actions based on the selected option can be performed here
  
    if (data) {

      if (this.chart) {
        this.chart.destroy();
      }

      this.httpServiceService.getEvents().subscribe((data) => {
        this.data = data.filter((event: { machine_name: any; }) => event.machine_name === this.selectedOption);
        this.createChart(this.data);

      });
    } else {
      console.log("Data is not yet available.");
    }
  }


  onSelectOptionMonth(event: any, data: any[]) {
    this.selectedOption = event.target.value;
    // Additional actions based on the selected option can be performed here
  
    if (data) {

      if (this.chart) {
        this.chart.destroy();
      }

      this.httpServiceService.getEvents().subscribe((data) => {
        this.data = data.filter((event: { timestamp: any; }) => event.timestamp.getMonth() === this.selectedOption);
        this.createChart(this.data);

      });
    } else {
      console.log("Data is not yet available.");
    }
  }
*/

  onSelectOptionMonth(event: any, data: EventData[]) {
    this.selectedMonth = event.target.value;
    console.log(data);
    this.handleSelectionChange(data);
  }

  onSelectOptionYear(event: any, data: EventData[]) {
    this.selectedYear = event.target.value;
    this.handleSelectionChange(data);
  }

  onSelectOptionName(event: any, data: EventData[]) {
    this.selectedName = event.target.value;
    this.handleSelectionChange(data);
  }

  handleSelectionChange(data: EventData[]) {

    this.filterEventsByDateAndMachine(this.selectedMonth, this.selectedYear, this.selectedName).subscribe(
      (filteredData) => {
        console.log('Filtered Data:', filteredData);
        // Do something with the filtered data
      },
      (error) => {
        console.error('Error:', error);
      }
    );


    // You can perform additional actions based on the selected values
  }

   getMonthFromString(month: string){
    return new Date(Date.parse(month +" 1, 2012")).getMonth()+1
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
                const [eventMonth ,eventDay, eventYear] = event.timestamp.split('/').map(Number);

                return (
                    eventMonth === this.getMonthFromString(month) &&
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



interface EventData {
  event_id: {
    $oid: string;
  };
  timestamp: string;
  machine_id: string;
  machine_name: string;
  temperature: number;
}
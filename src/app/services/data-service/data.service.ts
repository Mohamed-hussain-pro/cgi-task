import { Injectable } from '@angular/core';
import { EventData } from '../../model/event-data';
import { HttpServiceService } from '../../services/http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpServiceService: HttpServiceService) { }

  getAllNames(data: EventData[]): string[] {
    const machineNames = data.map((row: { machine_name: string; }) => row.machine_name);
    return [...new Set(machineNames)];
  }

  getAllMonths(data: EventData[]): any[] {
    let dates = data.map((row: { timestamp: string; }) => row.timestamp);
    let uniqueDates = [...new Set(dates)];

    // Extract months and years
    const monthsArray = uniqueDates.map(date => {
      const [month, day, year] = date.split('/');
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

  getAllYears(data: EventData[]): any[] {
    let dates = data.map((row: { timestamp: string; }) => row.timestamp);
    let uniqueDates = [...new Set(dates)];

    // Extract years
    const yearsArray = uniqueDates.map(date => {
      const [month, day, year] = date.split('/');
      return parseInt(year, 10);
    });

    // Convert to Set to get unique values
    const uniqueYears = [...new Set(yearsArray)];

    return uniqueYears;
  }

  getMonthFromString(month: string) {
    return new Date(Date.parse(month + " 1, 2012")).getMonth() + 1
  }

}

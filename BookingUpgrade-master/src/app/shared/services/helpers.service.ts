import { Injectable } from '@angular/core';
import { getDay, parseISO } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor() {}

  getDayName(date?: Date) {
    if (!date) return;
    console.log('date: ', date.getDay());
    let day = ' ';
    switch (date.getDay()) {
      case 0:
        day = 'Søndag';
        break;
      case 1:
        day = 'Mandag';
        break;
      case 2:
        day = 'Tirsdag';
        break;
      case 3:
        day = 'Onsdag';
        break;
      case 4:
        day = 'Torsdag';
        break;
      case 5:
        day = 'Fredag';
        break;
      case 6:
        day = 'Lørdag';
    }
    console.log(day);
    return day;
  }
}

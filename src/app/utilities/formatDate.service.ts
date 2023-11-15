import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatDateService {
  formatDate(dateToFormat: string | Date): string {
    if (dateToFormat === null) {
      return '';
    }

    const date = new Date(dateToFormat);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  formatDateTime(dateToFormat: string | Date): string {
    const date = new Date(dateToFormat);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${year}-${month}-${day}, ${hours}:${minutes} ${amOrPm}`;
  }
}

import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `
    <app-form (querySubmitted)="fetchData($event)"></app-form>
    <app-result *ngIf="responseData" [data]="responseData"></app-result>
  `,
})
export class AppComponent {
  responseData: any;

  constructor(private dataService: DataService) {}

  fetchData(city: string) {
    this.dataService.fetchData(city).subscribe((data) => {
      this.responseData = data;
    });
  }
}

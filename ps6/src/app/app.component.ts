import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  weatherData: any = {}; // Updated variable name

  constructor() {
    // Load initial data from mock file
  }

  loadData() {
    // Simulate fetching data from the mock file
    import('assets/mock-data.json').then((data) => {
      this.weatherData = data;
    });
  }

  fetchData() {
    // Simulate fetching data from the PS4 backend
    this.loadData();
  }

}


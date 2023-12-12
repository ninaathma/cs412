import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://weatherapi-com.p.rapidapi.com/current.json';

  constructor(private http: HttpClient) {}

  fetchData(city: string): Observable<any> {
    console.log(`Fetching data for city: ${city}`);
    const headers = new HttpHeaders({
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      'X-RapidAPI-Key': '6f3f7552c9msh8236d150d7b3cf7p184044jsnb274092385a4', // Replace with your RapidAPI key
    });

    const params = { q: city };

    return this.http.get(this.apiUrl, { headers, params });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl: string = 'https://restcountries.com/v3.1'
  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  constructor(private http: HttpClient) { }

  getCountriesByRegion(region: string): Observable<Country[]> {
    const url = `${ this.baseUrl }/region/${ region }`;
    return this.http.get<Country[]>(url);
  }

  getCountryByCode(code: string): Observable<Country[] | null> {
    if (!code) {
      return of(null);
    } else {
      const url = `${ this.baseUrl }/alpha/${ code }`;
      return this.http.get<Country[]>(url);
    }
  }
}

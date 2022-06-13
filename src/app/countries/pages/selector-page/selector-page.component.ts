import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  public myForm: FormGroup = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  });

  public regions: string[] = [];
  public countries: Country[] = [];
  public borders: string[] = [];

  public loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.regions = this.countriesService.regions;

    this.regionChanges();
    this.countryChanges();
  }

  public save() {
    console.log(this.myForm.value);
  }

  private regionChanges() {
    /* this.myForm.get('region')?.valueChanges.subscribe(r => {
      this.countriesService.getCountriesByRegion(r).subscribe(c => {
        this.countries = c;
      });
    }); */

    this.myForm.get('region')?.valueChanges
    .pipe(
      tap( (_) => {
        this.myForm.get('country')?.reset('');
        this.loading = true;
      }),
      switchMap(r => this.countriesService.getCountriesByRegion(r))
    )
    .subscribe( c => {
      this.loading = false;
      this.countries = c;
    });
  }

  private countryChanges() {
    this.myForm.get('country')?.valueChanges
    .pipe(
      tap( (_) => {
        this.myForm.get('border')?.reset('');
        this.loading = true;
      }),
      switchMap(code => this.countriesService.getCountryByCode(code))
    )
    .subscribe( country => {
      this.loading = false;
      if (country) {
        this.borders = (country[0].borders)? country[0].borders : [];
      }
    });
  }
}
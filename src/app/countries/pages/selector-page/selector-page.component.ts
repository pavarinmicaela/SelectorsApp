import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  public myForm: FormGroup = this.formBuilder.group({
    region: ['', Validators.required]
  });

  public regions: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.regions = this.countriesService.regions;
  }

  public save() {
    console.log(this.myForm.value);
  }

}

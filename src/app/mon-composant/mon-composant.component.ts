import { Component, ElementRef, Input, LOCALE_ID, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, map } from 'rxjs';


interface Country {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode: string;
}

@Component({
  selector: 'app-mon-composant',
  templateUrl: './mon-composant.component.html',
  styleUrls: ['./mon-composant.component.css']
})

export class MonComposantComponent {

  @ViewChild('input') input: ElementRef | undefined;
  showCountryList : boolean = false;

  countries: Country[] = [
    { name: "France", alpha2Code: "FR", alpha3Code: "FRA", numericCode: "250" },
    { name: "Albanie", alpha2Code: "AL", alpha3Code: "ALB", numericCode: "008" },
    { name: "Algérie", alpha2Code: "DZ", alpha3Code: "DZA", numericCode: "012" },
    { name: "Lettonie", alpha2Code: "LV", alpha3Code: "LVA", numericCode: "428" }
  ];

  filteredCountries: Array<Country> = [];

  clickcountrie(selectedcountrie: Country) {
    this.input!.nativeElement.value = selectedcountrie.name;
    this.filteredCountries = [selectedcountrie];
  }

  EventShowCountryList(YesOrNo : boolean){
    this.showCountryList = YesOrNo;
  }

  ngAfterViewInit() {
    fromEvent(this.input!.nativeElement, 'keyup')
      .pipe(
        debounceTime(10),
        map(x => this.input!.nativeElement.value)
      )
      .subscribe(countrieName => {
        this.filteredCountries = [];
        if (countrieName.length === 0)
          return;
        this.countries.forEach(item => {
          if (item.name.toLowerCase().indexOf(countrieName.toLowerCase()) !== -1) {
            this.filteredCountries.push(item);
          }
        });
      });
  }
}

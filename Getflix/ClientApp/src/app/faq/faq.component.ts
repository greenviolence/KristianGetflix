import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Henvendelse } from '../henvendelse';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/map";
import { Headers } from '@angular/http';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.css']
})
/** faq component*/
export class FaqComponent {
  visFaqs: boolean;
  alleFaqs: Array<Henvendelse>; // for listen av alle FAQ
  laster: boolean;
  constructor(private _http: Http) {

  }

  ngOnInit() {
    this.visFaqs = true;
  }
    hentAlleFaqs() {
      this._http.get("api/faq/") // ??
        //.map(returData => {   --- .map er ikke lenger nødvendig!
        //    let JsonData = returData.json();
        //    return JsonData;

        .subscribe(
          JsonData => {
            this.alleFaqs = [];
            if (JsonData) {
              for (let faqObjekt of JsonData.json()) {
                this.alleFaqs.push(faqObjekt);
                this.laster = false;
              }
            };
          },
          error => alert(error),
          () => console.log("ferdig get-api/faq")
        );
    };
}

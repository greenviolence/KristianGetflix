import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Svar } from '../Svar';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/map";
import { Headers } from '@angular/http';


@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css']
})
/** kontakt component*/
export class KontaktComponent {
  visSvarSkjema: boolean;
  svarSkjemaStatus: string;
  visSvar: boolean;
  alleSvar: Array<Svar>; // for listen av alle FAQ
  svarSkjema: FormGroup;

  constructor(private _http: Http, private fb: FormBuilder) {
    this.svarSkjema = fb.group({
      id: [""],
      navn: [null, Validators.compose([Validators.required])],
      svarmelding: [null, Validators.compose([Validators.required])],
      rating: [""]
    });
  }

  ngOnInit() {
    this.visSvarSkjema = false;
    this.hentAlleFaqs();
    this.visSvar = true;
  }

  hentAlleFaqs() {
    this._http.get("api/faq/")
      //.map(returData => {   --- .map er ikke lenger nødvendig!
      //    let JsonData = returData.json();
      //    return JsonData;

      .subscribe(
        JsonData => {
          this.alleSvar = [];
          if (JsonData) {
            for (let faqObjekt of JsonData.json()) {
              this.alleSvar.push(faqObjekt);
            }
          };
        },
        error => alert(error),
        () => console.log("ferdig get-api/faq")
      );
  };

  onSubmit() {
    if (this.svarSkjemaStatus == "Registrere") {
      this.lagreSvar();
    }
    else {
      alert("Feil i applikasjonen!");
    }
  }

  registrerFaq() {
    // må resette verdiene i skjema dersom skjema har blitt brukt til endringer

    this.svarSkjema.setValue({
      sid: "",
      navn: "",
      svarmelding: "",
      rating: ""
    });
    this.svarSkjema.markAsPristine();
    this.visSvar = false;
    this.svarSkjemaStatus = "Registrere";
    this.visSvarSkjema = true;
  }

  tilbakeTilSvarListe() {
    this.visSvar = true;
    this.visSvarSkjema = false;
  }

  lagreSvar() {
    var lagretSvar = new Svar();

    lagretSvar.navn = this.svarSkjema.value.navn;
    lagretSvar.svarmelding = this.svarSkjema.value.svarmelding;

    var body: string = JSON.stringify(lagretSvar);
    var headers = new Headers({ "Content-Type": "application/json" });

    this._http.post("api/faq", body, { headers: headers })
      //.map(returData => returData.toString())
      .subscribe(
        retur => {
          this.hentAlleFaqs();
          this.visSvarSkjema = false;
          this.visSvar = true;
        },
        error => alert(error),
        () => console.log("ferdig post-api/faq")
      );
  };

  //rateOpp(id: number) {
  //  this._http.get("api/faq/" + id)
  //    //.map(returData => {
  //    //    let JsonData = returData.json();
  //    //    return JsonData;
  //    // })
  //    .subscribe(
  //      returData => { // legg de hentede data inn i feltene til endreSkjema. Kan bruke setValue også her da hele skjemaet skal oppdateres. 
  //        let JsonData = returData.json();
  //        this.skjema.patchValue({ id: JsonData.id });
  //        this.skjema.patchValue({ navn: JsonData.navn });
  //        this.skjema.patchValue({ omrode: JsonData.omrode });
  //        this.skjema.patchValue({ melding: JsonData.melding });
  //        this.skjema.patchValue({ rating: JsonData.rating });
  //      },
  //      error => alert(error),
  //      () => console.log("ferdig get-api/faq")
  //    );
  //  this.skjemaStatus = "Endre";
  //  this.visSkjema = true;
  //  this.visFaqs = false;
  //}
  // her blir den endrede kunden lagret
  //oppRating() {
  //  var endretKunde = new Henvendelse();

  //  endretKunde.navn = this.skjema.value.navn;
  //  endretKunde.omrode = this.skjema.value.omrode;
  //  endretKunde.melding = this.skjema.value.melding;

  //  var body: string = JSON.stringify(endretKunde);
  //  var headers = new Headers({ "Content-Type": "application/json" });

  //  this._http.put("api/faq/" + this.skjema.value.id, body, { headers: headers })
  //    //.map(returData => returData.toString())
  //    .subscribe(
  //      retur => {
  //        this.hentAlleFaqs();
  //        this.visSkjema = false;
  //        this.visFaqs = true;
  //      },
  //      error => alert(error),
  //      () => console.log("ferdig post-api/faq")
  //    );
  //}
}

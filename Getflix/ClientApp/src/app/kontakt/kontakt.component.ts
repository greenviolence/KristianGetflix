import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Henvendelse } from '../henvendelse';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/map";
import { Headers } from '@angular/http';
import { style } from '@angular/core/src/animation/dsl';


@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css']
})
/** kontakt component*/
export class KontaktComponent {
  omrode = ['Betaling', 'Teknisk', 'Annet'];
  visSkjema: boolean;
  skjemaStatus: string;
  visFaqs: boolean;
  alleFaqs: Array<Henvendelse>; // for listen av alle FAQ
  skjema: FormGroup;
  laster: boolean;

  constructor(private _http: Http, private fb: FormBuilder) {
    this.skjema = fb.group({
      id: [""],
      navn: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZøæåØÆÅ\\-. ]{2,30}")])],
      omrode: [""],
      melding: [null, Validators.compose([Validators.required])],
      rating: [""]
    });
  }

  ngOnInit() {
    this.laster = true;
    this.visSkjema = false;
    this.hentAlleFaqs();
    this.visFaqs = true;
  }

  hentAlleFaqs() {
    this._http.get("api/faq/")
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

  onSubmit() {
    if (this.skjemaStatus == "Registrere") {
      this.lagreFaq();
    }
    else {
      alert("Feil i applikasjonen!");
    }
  }

  registrerFaq() {
    // må resette verdiene i skjema dersom skjema har blitt brukt til endringer

    this.skjema.setValue({
      id: "",
      navn: "",
      omrode: "",
      melding: "",
      rating: ""
    });
    this.skjema.markAsPristine();
    this.visFaqs = false;
    this.skjemaStatus = "Registrere";
    this.visSkjema = true;
  }

  tilbakeTilListe() {
    this.visFaqs = true;
    this.visSkjema = false;
  }

  lagreFaq() {
    var lagretHenvendelse = new Henvendelse();

    lagretHenvendelse.navn = this.skjema.value.navn;
    lagretHenvendelse.omrode = this.skjema.value.omrode;
    lagretHenvendelse.melding = this.skjema.value.melding;

    var body: string = JSON.stringify(lagretHenvendelse);
    var headers = new Headers({ "Content-Type": "application/json" });

    this._http.post("api/faq", body, { headers: headers })
      //.map(returData => returData.toString())
      .subscribe(
        retur => {
          this.hentAlleFaqs();
          this.visSkjema = false;
          this.visFaqs = true;
        },
        error => alert(error),
        () => console.log("ferdig post-api/faq")
      );
  };

  rateOpp(id: number) {
    this._http.get("api/faq/" + id)
      //.map(returData => {
      //    let JsonData = returData.json();
      //    return JsonData;
      // })
      .subscribe(
        returData => { // legg de hentede data inn i feltene til endreSkjema. Kan bruke setValue også her da hele skjemaet skal oppdateres. 
          let JsonData = returData.json();
          this.skjema.patchValue({ id: JsonData.id });
          this.skjema.patchValue({ navn: JsonData.navn });
          this.skjema.patchValue({ omrode: JsonData.omrode});
          this.skjema.patchValue({ melding: JsonData.melding });
          this.skjema.patchValue({ rating: JsonData.rating });
        },
        error => alert(error),
        () => console.log("ferdig get-api/faq")
      );
    this.skjemaStatus = "Endre";
    this.visSkjema = true;
    this.visFaqs = false;
  }
  // her blir den endrede kunden lagret
  oppRating() {
    var endretKunde = new Henvendelse();

    endretKunde.navn = this.skjema.value.navn;
    endretKunde.omrode = this.skjema.value.omrode;
    endretKunde.melding = this.skjema.value.melding;

    var body: string = JSON.stringify(endretKunde);
    var headers = new Headers({ "Content-Type": "application/json" });

    this._http.put("api/faq/" + this.skjema.value.id, body, { headers: headers })
      //.map(returData => returData.toString())
      .subscribe(
        retur => {
          this.hentAlleFaqs();
          this.visSkjema = false;
          this.visFaqs = true;
        },
        error => alert(error),
        () => console.log("ferdig post-api/faq")
      );
  }
}

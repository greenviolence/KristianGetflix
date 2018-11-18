import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Henvendelse } from '../henvendelse';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/map";
import { Headers } from '@angular/http';


@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css'],
})

export class KontaktComponent {
  omrode = ['Betaling', 'Teknisk', 'Annet'];
  visSkjema: boolean;
  skjemaStatus: string;
  visFaqs: boolean;
  alleFaqs: Array<Henvendelse>;
  skjema: FormGroup;
  laster: boolean;
  klikketStatus: string;

  constructor(private _http: Http, private fb: FormBuilder) {
    this.skjema = fb.group({
      id: [""],
      navn: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZøæåØÆÅ\\-. ]{2,30}")])],
      omrode: [null, Validators.compose([Validators.required])],
      melding: [null, Validators.compose([Validators.required])],
      svar: [""],
      rating: [""]
    });
  }

  // Når komponenten laster settes diverse statuser og hentAlleFaqs kjøres
  ngOnInit() {
    this.laster = true;
    this.visSkjema = false;
    this.hentAlleFaqs();
    this.visFaqs = true;
    this.klikketStatus = "Alle";
  }

  // Henter spørsmålene og setter dem i et array
  hentAlleFaqs() {
    this._http.get("api/faq/")
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

  // kaller på ulike funksjonene ved ulike tilfeller av at en submit knapp er trykket
  onSubmit() {
    if (this.skjemaStatus == "Registrere") {
      this.lagreFaq();
    }
    else if (this.skjemaStatus == "Svare") {
      this.endre();
    }
    else if (this.skjemaStatus == "RateOpp") {
      this.endre();
    }
    else if (this.skjemaStatus == "RateNed") {
      this.endre();
    }
    else {
      alert("Feil i applikasjonen!");
    }
  }

  registrerFaq() {
    // reseter verdiene i skjema dersom skjema har blitt brukt til endringer
    this.skjema.setValue({
      id: "",
      navn: "",
      omrode: "",
      melding: "",
      svar: "",
      rating: ""
    });
    this.skjema.markAsPristine();
    this.visFaqs = false;
    this.skjemaStatus = "Registrere";
    this.visSkjema = true;
  }

  tilbakeTilFaq() {
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

  lageSvar(id: number) {
    this._http.get("api/faq/" + id)
      .subscribe(
        returData => { 
          let JsonData = returData.json();
          this.skjema.patchValue({ id: JsonData.id });
          this.skjema.patchValue({ navn: JsonData.navn });
          this.skjema.patchValue({ omrode: JsonData.omrode});
          this.skjema.patchValue({ melding: JsonData.melding });
          this.skjema.patchValue({ svar: JsonData.svar });
          this.skjema.patchValue({ rating: JsonData.rating });
        },
        error => alert(error),
        () => console.log("ferdig get-api/faq")
      );
    this.skjemaStatus = "Svare";
    this.visSkjema = true;
    this.visFaqs = false;
  }

  endre() {
    var endretFaq = new Henvendelse();

    endretFaq.navn = this.skjema.value.navn;
    endretFaq.omrode = this.skjema.value.omrode;
    endretFaq.melding = this.skjema.value.melding;
    endretFaq.svar = this.skjema.value.svar;
    if (this.skjemaStatus == 'RateOpp') {
      endretFaq.rating = this.skjema.value.rating += 1;
    }
    else if (this.skjemaStatus == 'RateNed') {
      endretFaq.rating = this.skjema.value.rating -= 1;
    }
    else {
      endretFaq.rating = this.skjema.value.rating;
    }

    var body: string = JSON.stringify(endretFaq);
    var headers = new Headers({ "Content-Type": "application/json" });

    this._http.put("api/faq/" + this.skjema.value.id, body, { headers: headers })
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

  rateOpp(id: number) {
    this._http.get("api/faq/" + id)
      .subscribe(
        returData => {
          let JsonData = returData.json();
          this.skjema.patchValue({ id: JsonData.id });
          this.skjema.patchValue({ navn: JsonData.navn });
          this.skjema.patchValue({ omrode: JsonData.omrode });
          this.skjema.patchValue({ melding: JsonData.melding });
          this.skjema.patchValue({ svar: JsonData.svar });
          this.skjema.patchValue({ rating: JsonData.rating });
        },
        error => alert(error),
        () => console.log("ferdig get-api/faq")
      );
    this.skjemaStatus = "RateOpp";
    this.visSkjema = true;
    this.visFaqs = false;
  }

  rateNed(id: number) {
    this._http.get("api/faq/" + id)
      .subscribe(
        returData => { 
          let JsonData = returData.json();
          this.skjema.patchValue({ id: JsonData.id });
          this.skjema.patchValue({ navn: JsonData.navn });
          this.skjema.patchValue({ omrode: JsonData.omrode });
          this.skjema.patchValue({ melding: JsonData.melding });
          this.skjema.patchValue({ svar: JsonData.svar });
          this.skjema.patchValue({ rating: JsonData.rating });
        },
        error => alert(error),
        () => console.log("ferdig get-api/faq")
      );
    this.skjemaStatus = "RateNed";
    this.visSkjema = true;
    this.visFaqs = false;
  }


  // Funksjoner for filtervisning
  visAlle() {
    this.klikketStatus = "Alle";
  }

  visBetaling() {
    this.klikketStatus = "Betaling";
  }

  visTeknisk() {
    this.klikketStatus = "Teknisk";
  }

  visAnnet() {
    this.klikketStatus = "Annet";
  }
}

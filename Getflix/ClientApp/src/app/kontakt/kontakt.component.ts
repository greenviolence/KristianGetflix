import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Henvendelse } from '../henvendelse';


@Component({
    selector: 'app-kontakt',
    templateUrl: './kontakt.component.html',
    styleUrls: ['./kontakt.component.css']
})
/** kontakt component*/
export class KontaktComponent {
  omrode = ['Betaling', 'Teknisk', 'Annet'];
  sendt = false;
  onSubmit() { this.sendt = true }

  model = new Henvendelse(1, 'Karl', this.omrode[0], "Hei");

  get diagnostic() { return JSON.stringify(this.model); }
}

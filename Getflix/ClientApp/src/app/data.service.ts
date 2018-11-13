import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  constructor() { }

  firstClick() {
    return console.log("klikket");
  }
}

export class Henvendelse {
  public id: number;
  public navn: string;
  public omrode: string;
  public melding: string;

  constructor(
    id: number,
    navn: string,
    omrode: string,
    melding: string
  ) {
    this.id = id;
    this.navn = navn;
    this.omrode = omrode;
    this.melding = melding;
  }
}

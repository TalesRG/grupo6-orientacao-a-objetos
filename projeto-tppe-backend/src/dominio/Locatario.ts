export class Locatario {
  private email: string;
  private celular: string;

  constructor(email: string, celular: string) {
    this.email = email;
    this.celular = celular;
  }

  getEmail(): string {
    return this.email;
  }

  getCelular(): string {
    return this.celular;
  }
}

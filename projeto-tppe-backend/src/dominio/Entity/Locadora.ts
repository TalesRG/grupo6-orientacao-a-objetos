import { Locatario } from './Locatario';

export class Locadora {
  private nome: string;
  private locatario: Locatario;

  constructor(nome: string, locatario: Locatario) {
    this.nome = nome;
    this.locatario = locatario;
  }

  getNome(): string {
    return this.nome;
  }

  getLocatorio(): Locatario {
    return this.locatario;
  }
}

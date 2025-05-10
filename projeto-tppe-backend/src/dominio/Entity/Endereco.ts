export class Endereco {
  private logradouro: string;
  private numero: number;
  private complemento: string;
  private bairro: string;
  private cidade: string;
  private estado: string;
  private cep: string;

  constructor(
    logradouro: string,
    numero: number,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    cep: string,
  ) {
    this.logradouro = logradouro;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
  }

  getLogradouro(): string {
    return this.logradouro;
  }

  getNumero(): number {
    return this.numero;
  }

  getComplemento(): string {
    return this.complemento;
  }

  getBairro(): string {
    return this.bairro;
  }

  getCidade(): string {
    return this.cidade;
  }

  getEstado(): string {
    return this.estado;
  }

  getCep(): string {
    return this.cep;
  }
}

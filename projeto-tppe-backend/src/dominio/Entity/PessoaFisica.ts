export class PessoaFisica {
  private cpf: string;
  private nome: string;
  private estadoCivil: string;

  constructor(cpf: string, nome: string, estadoCivil: string) {
    this.cpf = cpf;
    this.nome = nome;
    this.estadoCivil = estadoCivil;
  }
  getCpf(): string {
    return this.cpf;
  }

  getNome(): string {
    return this.nome;
  }

  getEstadoCivil(): string {
    return this.estadoCivil;
  }
}

export class PessoaJuridica {
  private cnpj: string;
  private nomeSocial: string;

  constructor(cnpj: string, nomeSocial: string) {
    this.cnpj = cnpj;
    this.nomeSocial = nomeSocial;
  }

  getCnpj(): string {
    return this.cnpj;
  }

  getNomeSocial(): string {
    return this.nomeSocial;
  }
}

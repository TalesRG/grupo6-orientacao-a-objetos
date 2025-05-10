export class ValorTotal {
  private seguroProtecaoTerceiros: number;
  private imposto: number;
  private seguroProtecaoCarro: number;

  constructor(
    seguroProtecaoTerceiros: number,
    imposto: number,
    seguroProtecaoCarro: number,
  ) {
    this.seguroProtecaoTerceiros = seguroProtecaoTerceiros;
    this.imposto = imposto;
    this.seguroProtecaoCarro = seguroProtecaoCarro;
  }

  retornarValorTotal(): number {
    return (
      this.seguroProtecaoTerceiros + this.imposto + this.seguroProtecaoCarro
    );
  }
}

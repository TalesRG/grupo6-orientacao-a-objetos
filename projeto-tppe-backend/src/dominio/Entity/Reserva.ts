export class Reserva {
  private id: string;
  private dataReserva: Date;
  private dataDevolucao: Date;
  private valorTotal: number;

  constructor(
    id: string,
    dataReserva: Date,
    dataDevolucao: Date,
    valorTotal: number,
  ) {
    this.id = id;
    this.dataReserva = dataReserva;
    this.dataDevolucao = dataDevolucao;
    this.valorTotal = valorTotal;
  }

  getId(): string {
    return this.id;
  }

  getDataReserva(): Date {
    return this.dataReserva;
  }

  getDataDevolucao(): Date {
    return this.dataDevolucao;
  }

  getValorTotal(): number {
    return this.valorTotal;
  }
}

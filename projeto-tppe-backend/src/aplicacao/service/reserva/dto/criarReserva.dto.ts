import { ApiProperty } from '@nestjs/swagger';

export class CriarReservaDto {
  @ApiProperty()
  locatario: string;
  @ApiProperty()
  locadora: string;
  @ApiProperty()
  veiculo: string;
  @ApiProperty()
  dataInicio: string;
  @ApiProperty()
  dataFim: string;
  @ApiProperty()
  valorBase: number;
  @ApiProperty()
  seguros: string[];
  @ApiProperty()
  valorTotal: number;
  @ApiProperty()
  status: string;
}

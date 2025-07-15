import { ApiProperty } from '@nestjs/swagger';

export class CriarLocadoraDto {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  cnpj: string;
  @ApiProperty()
  telefone: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  endereco: string;
  @ApiProperty({ default: 'Ativa' })
  status: string;
}

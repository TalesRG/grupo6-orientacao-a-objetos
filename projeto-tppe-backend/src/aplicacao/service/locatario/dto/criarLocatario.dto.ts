import { ApiProperty } from '@nestjs/swagger';

export class CriarLocatarioDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  telefone: string;

  @ApiProperty()
  tipo: string;

  @ApiProperty()
  documento: string;

  @ApiProperty()
  endereco: string;

  @ApiProperty()
  status: string;
}

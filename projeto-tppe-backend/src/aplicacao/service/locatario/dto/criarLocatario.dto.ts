import { ApiProperty } from '@nestjs/swagger';

export class CriarLocatarioDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  celular: string;
  @ApiProperty()
  tipo: string;
}

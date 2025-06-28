import { CriarLocatarioDto } from './criarLocatario.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CriarLocatarioPessoaFisicaDto extends CriarLocatarioDto {
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  nome: string;
}

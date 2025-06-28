import { CriarLocatarioDto } from './criarLocatario.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CriarLocatarioPessoaJuridicaDto extends CriarLocatarioDto {
  @ApiProperty()
  cnpj: string;
  @ApiProperty()
  nomeSocial: string;
}

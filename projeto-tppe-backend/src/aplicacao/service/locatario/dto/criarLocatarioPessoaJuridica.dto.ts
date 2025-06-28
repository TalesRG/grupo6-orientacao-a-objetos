import { CriarLocatarioDto } from './criarLocatario.dto';

export class CriarLocatarioPessoaJuridicaDto extends CriarLocatarioDto {
  cnpj: string;
  nomeSocial: string;
}

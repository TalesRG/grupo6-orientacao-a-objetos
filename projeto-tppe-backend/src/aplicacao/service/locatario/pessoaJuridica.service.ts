import { PessoaJuridicaOrmEntity } from '../../../adapters/repository/pessoaJuridicaOrm.entity';
import { CriarLocatarioPessoaJuridicaDto } from './dto/criarLocatarioPessoaJuridica.dto';

export interface PessoaJuridicaService {
  criarPessoaJuridica(
    pessoaJuridicaDto: CriarLocatarioPessoaJuridicaDto,
  ): Promise<PessoaJuridicaOrmEntity>;
}

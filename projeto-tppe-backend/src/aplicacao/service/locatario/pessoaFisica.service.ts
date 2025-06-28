import { CriarLocatarioPessoaFisicaDto } from './dto/criarLocatarioPessoaFisica.dto';
import { PessoaFisicaOrmEntity } from '../../../adapters/repository/pessoaFisicaOrm.entity';

export interface PessoaFisicaService {
  criarPessoaFisica(
    pessoaFisicaDto: CriarLocatarioPessoaFisicaDto,
  ): Promise<PessoaFisicaOrmEntity>;
}

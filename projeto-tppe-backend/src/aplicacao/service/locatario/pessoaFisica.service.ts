import { CriarLocatarioPessoaFisicaDto } from './dto/criarLocatarioPessoaFisica.dto';
import { PessoaFisicaOrmEntity } from '../../../adaptadores/repository/pessoaFisicaOrm.entity';

export interface PessoaFisicaService {
  criarPessoaFisica(
    pessoaFisicaDto: CriarLocatarioPessoaFisicaDto,
  ): Promise<PessoaFisicaOrmEntity>;
}

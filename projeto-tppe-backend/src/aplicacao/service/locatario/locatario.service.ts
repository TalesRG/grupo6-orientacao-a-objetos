import { LocatarioOrmEntity } from '../../../adapters/repository/locatarioOrm.entity';
import { CriarLocatarioDto } from './dto/criarLocatario.dto';

export interface LocatarioService {
  criarLocatario(locatarioDto: CriarLocatarioDto): Promise<LocatarioOrmEntity>;
}

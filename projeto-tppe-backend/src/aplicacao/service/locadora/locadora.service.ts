import { CriarLocadoraDto } from './dto/criarLocadora.dto';
import { LocadoraOrmEntity } from '../../../adapters/repository/locadoraOrm.entity';

export interface LocadoraService {
  criarLocadora(locadoraDto: CriarLocadoraDto): Promise<LocadoraOrmEntity>;
}

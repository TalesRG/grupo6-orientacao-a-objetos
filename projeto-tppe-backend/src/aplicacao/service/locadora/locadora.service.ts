import { CriarLocadoraDto } from './dto/criarLocadora.dto';
import { LocadoraOrmEntity } from '../../../adaptadores/repository/locadoraOrm.entity';

export interface LocadoraService {
  criarLocadora(locadoraDto: CriarLocadoraDto): Promise<LocadoraOrmEntity>;
}

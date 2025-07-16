import { CriarReservaDto } from './dto/criarReserva.dto';
import { ReservaOrmEntity } from '../../../adaptadores/repository/reservaOrm.entity';

export interface ReservaService {
  criarReserva(reservaDto: CriarReservaDto): Promise<ReservaOrmEntity>;
}

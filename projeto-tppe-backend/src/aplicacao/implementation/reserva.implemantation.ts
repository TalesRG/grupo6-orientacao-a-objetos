import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservaService } from '../service/reserva/reserva.service';
import { ReservaOrmEntity } from '../../adaptadores/repository/reservaOrm.entity';
import { CriarReservaDto } from '../service/reserva/dto/criarReserva.dto';

@Injectable()
export class ReservaServiceImpl implements ReservaService {
  constructor(
    @InjectRepository(ReservaOrmEntity)
    private readonly reservaRepository: Repository<ReservaOrmEntity>,
  ) {}

  criarReserva(reservaDto: CriarReservaDto): Promise<ReservaOrmEntity> {
    const reserva = this.reservaRepository.create(reservaDto);
    return this.reservaRepository.save(reserva);
  }

  listarReservas(): Promise<ReservaOrmEntity[]> {
    return this.reservaRepository.find();
  }
}

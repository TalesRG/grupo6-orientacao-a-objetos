import { Injectable, NotFoundException } from '@nestjs/common';
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

  async cancelarReserva(id: number): Promise<void> {
    const reserva = await this.reservaRepository.findOne({ where: { id } });

    if (!reserva) {
      throw new NotFoundException(`Reserva com ID ${id} não encontrada.`);
    }

    reserva.status = 'Cancelada';
    await this.reservaRepository.save(reserva);
  }

  async editarReserva(
    id: number,
    reservaDto: CriarReservaDto,
  ): Promise<ReservaOrmEntity> {
    const reserva = await this.reservaRepository.findOne({ where: { id } });

    if (!reserva) {
      throw new NotFoundException(`Reserva com ID ${id} não encontrada.`);
    }

    Object.assign(reserva, reservaDto);

    return this.reservaRepository.save(reserva);
  }
}

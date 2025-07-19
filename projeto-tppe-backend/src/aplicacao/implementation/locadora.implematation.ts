import { Injectable } from '@nestjs/common';
import { LocadoraOrmEntity } from '../../adaptadores/repository/locadoraOrm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LocadoraService } from '../service/locadora/locadora.service';
import { CriarLocadoraDto } from '../service/locadora/dto/criarLocadora.dto';
import { Repository } from 'typeorm';

@Injectable()
export class LocadoraServiceImpl implements LocadoraService {
  constructor(
    @InjectRepository(LocadoraOrmEntity)
    private locadoraRepository: Repository<LocadoraOrmEntity>,
  ) {}

  async criarLocadora(
    criarLocadora: CriarLocadoraDto,
  ): Promise<LocadoraOrmEntity> {
    const locadoraEntity = this.locadoraRepository.create(criarLocadora);
    return this.locadoraRepository.save(locadoraEntity);
  }

  async listarLocadoras(): Promise<LocadoraOrmEntity[]> {
    return this.locadoraRepository.find();
  }

  async totalLocadoras(): Promise<number> {
    return this.locadoraRepository.count({ where: { status: 'Ativa' } });
  }

  async deleteLocadora(id: string): Promise<void> {
    const locadora = await this.locadoraRepository.findOne({ where: { id } });
    if (!locadora) {
      throw new Error(`Locadora com ID ${id} não encontrada.`);
    }
    await this.locadoraRepository.remove(locadora);
  }
}

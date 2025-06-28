import { Injectable } from '@nestjs/common';
import { LocatarioService } from '../../service/locatario/locatario.service';
import { InjectRepository } from '@nestjs/typeorm';
import { LocatarioOrmEntity } from '../../../adapters/repository/locatarioOrm.entity';
import { Repository } from 'typeorm';
import { CriarLocatarioDto } from '../../service/locatario/dto/criarLocatario.dto';

@Injectable()
export class LocatarioServiceImpl implements LocatarioService {
  constructor(
    @InjectRepository(LocatarioOrmEntity)
    private readonly locatarioRepository: Repository<LocatarioOrmEntity>,
  ) {}

  async criarLocatario(
    locatarioDto: CriarLocatarioDto,
  ): Promise<LocatarioOrmEntity> {
    const locatario = this.locatarioRepository.create(locatarioDto);
    return await this.locatarioRepository.save(locatario);
  }
}

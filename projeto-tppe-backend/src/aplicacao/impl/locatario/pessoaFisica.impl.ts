import { Injectable } from '@nestjs/common';
import { PessoaFisicaService } from '../../service/locatario/pessoaFisica.service';
import { CriarLocatarioPessoaFisicaDto } from '../../service/locatario/dto/criarLocatarioPessoaFisica.dto';
import { PessoaFisicaOrmEntity } from '../../../adapters/repository/pessoaFisicaOrm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocatarioServiceImpl } from './locatario.impl';
import { CriarLocatarioDto } from '../../service/locatario/dto/criarLocatario.dto';
import { TipoLocatarioEnum } from '../../service/locatario/enum/tipoLocatario.enum';

@Injectable()
export class PessoaFisicaServiceImpl implements PessoaFisicaService {
  constructor(
    @InjectRepository(PessoaFisicaOrmEntity)
    private pessoaFisicaRepository: Repository<PessoaFisicaOrmEntity>,

    private locatarioService: LocatarioServiceImpl,
  ) {}
  async criarPessoaFisica(
    pessoaFisicaDto: CriarLocatarioPessoaFisicaDto,
  ): Promise<PessoaFisicaOrmEntity> {
    const { cpf, email, nome, celular } = pessoaFisicaDto;

    const locatarioDto: CriarLocatarioDto = {
      email,
      celular,
      tipo: TipoLocatarioEnum.PESSOA_JURIDICA,
    };

    const locatarioEntity =
      await this.locatarioService.criarLocatario(locatarioDto);

    const pessoaFisicaEntity = this.pessoaFisicaRepository.create({
      idLocatario: locatarioEntity.id,
      nome: nome,
      cpf: cpf,
    });

    return this.pessoaFisicaRepository.save(pessoaFisicaEntity);
  }
}

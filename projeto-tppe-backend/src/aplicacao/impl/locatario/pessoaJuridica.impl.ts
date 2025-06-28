import { PessoaJuridicaService } from '../../service/locatario/pessoaJuridica.service';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PessoaJuridicaOrmEntity } from '../../../adapters/repository/pessoaJuridicaOrm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CriarLocatarioPessoaJuridicaDto } from 'src/aplicacao/service/locatario/dto/criarLocatarioPessoaJuridica.dto';
import { CriarLocatarioDto } from '../../service/locatario/dto/criarLocatario.dto';
import { TipoLocatarioEnum } from '../../service/locatario/enum/tipoLocatario.enum';
import { LocatarioServiceImpl } from './locatario.impl';

@Injectable()
export class PessoaJuridicaServiceImpl implements PessoaJuridicaService {
  constructor(
    @InjectRepository(PessoaJuridicaOrmEntity)
    private pessoaJuridicaRepository: Repository<PessoaJuridicaOrmEntity>,
    private locatarioService: LocatarioServiceImpl,
  ) {}

  async criarPessoaJuridica(
    pessoaJuridicaDto: CriarLocatarioPessoaJuridicaDto,
  ): Promise<PessoaJuridicaOrmEntity> {
    const { cnpj, email, nomeSocial, celular } = pessoaJuridicaDto;

    const locatarioDto: CriarLocatarioDto = {
      email,
      celular,
      tipo: TipoLocatarioEnum.PESSOA_FISICA,
    };

    const locatarioEntity =
      await this.locatarioService.criarLocatario(locatarioDto);

    const pessoaFisicaEntity = this.pessoaJuridicaRepository.create({
      idLocatario: locatarioEntity.id,
      cnpj: cnpj,
      nomeSocial: nomeSocial,
    });

    return this.pessoaJuridicaRepository.save(pessoaFisicaEntity);
  }
}

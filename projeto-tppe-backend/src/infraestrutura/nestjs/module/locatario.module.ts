import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaFisicaOrmEntity } from '../../../adapters/repository/pessoaFisicaOrm.entity';
import { LocatarioOrmEntity } from '../../../adapters/repository/locatarioOrm.entity';
import { PessoaJuridicaOrmEntity } from '../../../adapters/repository/pessoaJuridicaOrm.entity';
import { LocatarioController } from '../../../adapters/controllers/locatario.controller';
import { LocatarioServiceImpl } from '../../../aplicacao/impl/locatario/locatario.impl';
import { PessoaFisicaServiceImpl } from '../../../aplicacao/impl/locatario/pessoaFisica.impl';
import { PessoaJuridicaServiceImpl } from '../../../aplicacao/impl/locatario/pessoaJuridica.impl';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LocatarioOrmEntity,
      PessoaJuridicaOrmEntity,
      PessoaFisicaOrmEntity,
    ]),
  ],
  controllers: [LocatarioController],
  providers: [
    LocatarioServiceImpl,
    PessoaFisicaServiceImpl,
    PessoaJuridicaServiceImpl,
  ],
  exports: [],
})
export class LocatarioModule {}

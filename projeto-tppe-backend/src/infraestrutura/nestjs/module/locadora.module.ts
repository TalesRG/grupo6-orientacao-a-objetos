import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocadoraServiceImpl } from '../../../aplicacao/impl/locadora/locatario.impl';
import { LocadoraController } from '../../../adapters/controllers/locadora.controller';
import { LocadoraOrmEntity } from '../../../adapters/repository/locadoraOrm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocadoraOrmEntity])],
  controllers: [LocadoraController],
  providers: [LocadoraServiceImpl],
  exports: [],
})
export class LocadoraModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocadoraOrmEntity } from '../../../adapters/repository/locadoraOrm.entity';
import { LocadoraServiceImpl } from '../../../aplicacao/impl/locadora/locatario.impl';
import { LocadoraController } from '../../../adapters/controllers/locadora.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LocadoraOrmEntity])],
  providers: [LocadoraServiceImpl],
  controllers: [LocadoraController],
})
export class LoadoraModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocadoraServiceImpl } from '../../../aplicacao/implementation/locadora.impl';
import { LocadoraController } from '../../../adaptadores/controllers/locadora.controller';
import { LocadoraOrmEntity } from '../../../adaptadores/repository/locadoraOrm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocadoraOrmEntity])],
  controllers: [LocadoraController],
  providers: [LocadoraServiceImpl],
  exports: [],
})
export class LocadoraModule {}

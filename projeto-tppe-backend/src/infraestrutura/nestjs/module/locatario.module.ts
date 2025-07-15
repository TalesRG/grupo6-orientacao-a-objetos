import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocatarioOrmEntity } from '../../../adapters/repository/locatarioOrm.entity';
import { LocatarioController } from '../../../adapters/controllers/locatario.controller';
import { LocatarioServiceImpl } from '../../../aplicacao/impl/locatario/locatario.impl';

@Module({
  imports: [TypeOrmModule.forFeature([LocatarioOrmEntity])],
  controllers: [LocatarioController],
  providers: [LocatarioServiceImpl],
  exports: [],
})
export class LocatarioModule {}

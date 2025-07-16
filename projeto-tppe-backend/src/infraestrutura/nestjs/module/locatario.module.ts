import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocatarioOrmEntity } from '../../../adaptadores/repository/locatarioOrm.entity';
import { LocatarioController } from '../../../adaptadores/controllers/locatario.controller';
import { LocatarioServiceImpl } from '../../../aplicacao/implementation/locatario.implematation';

@Module({
  imports: [TypeOrmModule.forFeature([LocatarioOrmEntity])],
  controllers: [LocatarioController],
  providers: [LocatarioServiceImpl],
  exports: [],
})
export class LocatarioModule {}

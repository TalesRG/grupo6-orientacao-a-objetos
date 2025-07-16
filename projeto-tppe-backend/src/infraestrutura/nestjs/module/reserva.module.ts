import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaOrmEntity } from '../../../adaptadores/repository/reservaOrm.entity';
import { ReservaServiceImpl } from '../../../aplicacao/implementation/reserva.implemantation';
import { ReservaController } from '../../../adaptadores/controllers/reserva.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaOrmEntity])],
  controllers: [ReservaController],
  providers: [ReservaServiceImpl],
  exports: [],
})
export default class ReservaModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaController } from '../../../adaptadores/repository/reserva.controller';
import { ReservaOrmEntity } from '../../../adaptadores/repository/reservaOrm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaOrmEntity])],
  controllers: [ReservaController],
  providers: [],
  exports: [],
})
export default class ReservaModule {}

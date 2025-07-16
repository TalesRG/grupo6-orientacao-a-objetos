import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministradorOrmEntity } from '../../../adaptadores/repository/administradorOrm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdministradorOrmEntity])],
  providers: [],
  controllers: [],
  exports: [],
})
export class AdminModule {}

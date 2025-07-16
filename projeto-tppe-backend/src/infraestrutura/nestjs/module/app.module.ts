import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../../database/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin.module';
import { LocatarioModule } from './locatario.module';
import { LocatarioOrmEntity } from '../../../adaptadores/repository/locatarioOrm.entity';
import { LocadoraOrmEntity } from '../../../adaptadores/repository/locadoraOrm.entity';
import { LocadoraModule } from './locadora.module';
import ReservaModule from './reserva.module';
import { ReservaOrmEntity } from '../../../adaptadores/repository/reservaOrm.entity';
@Module({
  imports: [
    AdminModule,
    LocatarioModule,
    LocadoraModule,
    ReservaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [LocatarioOrmEntity, LocadoraOrmEntity, ReservaOrmEntity],
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule {}

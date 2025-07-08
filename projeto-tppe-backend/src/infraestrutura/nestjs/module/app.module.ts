import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../../database/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin.module';
import { LocatarioModule } from './locatario.module';
import { LocatarioOrmEntity } from '../../../adapters/repository/locatarioOrm.entity';
import { PessoaFisicaOrmEntity } from '../../../adapters/repository/pessoaFisicaOrm.entity';
import { PessoaJuridicaOrmEntity } from '../../../adapters/repository/pessoaJuridicaOrm.entity';
import { LoadoraModule } from './locadora.module';
import { LocadoraOrmEntity } from '../../../adapters/repository/locadoraOrm.entity';
@Module({
  imports: [
    AdminModule,
    LocatarioModule,
    LoadoraModule,
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
        entities: [
          LocatarioOrmEntity,
          PessoaFisicaOrmEntity,
          PessoaJuridicaOrmEntity,
          LocadoraOrmEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule {}

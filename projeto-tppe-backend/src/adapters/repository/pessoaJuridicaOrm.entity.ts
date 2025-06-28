import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { LocatarioOrmEntity } from './locatarioOrm.entity';

@Entity('pessoas_juridicas')
export class PessoaJuridicaOrmEntity {
  @PrimaryColumn()
  idLocatario: string;

  @OneToOne(() => LocatarioOrmEntity)
  @JoinColumn({ name: 'idLocatario' })
  locatario: LocatarioOrmEntity;

  @Column()
  cnpj: string;
  @Column()
  nomeSocial: string;
}

import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { LocatarioOrmEntity } from './locatarioOrm.entity';

@Entity('pessoas_fisicas')
export class PessoaFisicaOrmEntity {
  @PrimaryColumn()
  idLocatario: string;

  @OneToOne(() => LocatarioOrmEntity, { eager: true })
  @JoinColumn({ name: 'idLocatario' })
  locatario: LocatarioOrmEntity;

  @Column()
  cpf: string;
  @Column()
  nome: string;
}

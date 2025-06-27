import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pessoas_juridicas')
export class PessoaJuridicaOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  cnpj: string;
  @Column()
  nomeSocial: string;
}

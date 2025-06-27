import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pessoas_fisicas')
export class PessoaFisicaOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  cpf: string;
  @Column()
  nome: string;
  @Column()
  estadoCivil: string;
}

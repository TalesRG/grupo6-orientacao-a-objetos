import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locadoras')
export class LocadoraOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column()
  endereco: string;
}

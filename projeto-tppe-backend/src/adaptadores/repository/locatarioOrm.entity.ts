import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locatarios')
export class LocatarioOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nome: string;
  @Column()
  email: string;
  @Column()
  telefone: string;
  @Column()
  tipo: string;
  @Column()
  documento: string;
  @Column()
  endereco: string;
  @Column()
  status: string;
}

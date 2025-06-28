import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locadoras')
export class LocadoraOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  nome: string;
}

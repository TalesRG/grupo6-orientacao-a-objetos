import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locadoras')
export class LocadoraOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
}

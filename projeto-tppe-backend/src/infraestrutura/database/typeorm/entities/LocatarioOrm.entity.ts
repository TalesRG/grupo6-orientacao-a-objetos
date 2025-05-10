import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locatarios')
export class LocatarioOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  celular: string;
}

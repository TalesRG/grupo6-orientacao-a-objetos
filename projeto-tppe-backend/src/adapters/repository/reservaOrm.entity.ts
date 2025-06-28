import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservas')
export class ReservaOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  dataReserva: Date;
  @Column()
  dataDevolucao: Date;
  @Column()
  valorTotal: number;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservas')
export class ReservaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  locatario: string;
  @Column()
  locadora: string;
  @Column()
  veiculo: string;
  @Column()
  dataInicio: string;
  @Column()
  dataFim: string;
  @Column()
  valorBase: number;
  @Column('simple-array')
  seguros: string[];
  @Column()
  valorTotal: number;
  @Column()
  status: string;
}

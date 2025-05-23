import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('valores_totais')
export class ValorTotalOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  seguroProtecaoTerceiros: number;
  @Column()
  imposto: number;
  @Column()
  seguroProtecaoCarro: number;
}

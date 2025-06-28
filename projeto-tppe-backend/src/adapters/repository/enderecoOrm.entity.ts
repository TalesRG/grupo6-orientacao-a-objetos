import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('enderecos')
export class EnderecoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  logradouro: string;

  @Column()
  numero: number;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;
  @Column()
  estado: string;
  @Column()
  cep: string;
}

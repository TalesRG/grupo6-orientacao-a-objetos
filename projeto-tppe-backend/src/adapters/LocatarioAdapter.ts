import { LocatarioOrmEntity } from '../infraestrutura/database/typeorm/entities/LocatarioOrm.entity';
import { Locatario } from '../dominio/Entity/Locatario';

export class LocatarioAdapter {
  static toDomain(entity: LocatarioOrmEntity): Locatario {
    return new Locatario(entity.email, entity.celular);
  }

  static toOrm(entity: Locatario): LocatarioOrmEntity {
    const ormEntity = new LocatarioOrmEntity();
    ormEntity.email = entity.getEmail();
    ormEntity.celular = entity.getCelular();
    return ormEntity;
  }
}

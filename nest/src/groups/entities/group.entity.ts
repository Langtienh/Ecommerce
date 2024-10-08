import { EntityWithSoftDelete } from 'src/base/entity-with-soft-delete';
import { Resource } from 'src/resources/entities/resource.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Group extends EntityWithSoftDelete {
  @Column()
  name: string;

  @ManyToOne(() => Resource)
  @JoinColumn()
  resource: Resource;
}

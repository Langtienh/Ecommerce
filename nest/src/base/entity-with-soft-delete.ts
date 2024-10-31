import { Exclude } from 'class-transformer'
import { Property } from 'src/decorator/customize'
import { DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export class EntityWithSoftDelete {
  @Property
  @PrimaryGeneratedColumn()
  id: number

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}

export const EntityWithSoftDeleteFields = ['id', 'deletedAt']

import { EntityWithUpdator, EntityWithUpdatorFields } from '@/lib/entity-base/entity-with-updator'
import { TypeAccessConvert } from '@/lib/utils'
import { Column, Entity } from 'typeorm'

@Entity()
export class Resource extends EntityWithUpdator {
  @Column({ unique: true })
  name: string

  @Column()
  description: string
}

export const resourceFields = {
  ...EntityWithUpdatorFields,
  name: TypeAccessConvert.STRING,
  description: TypeAccessConvert.STRING
}

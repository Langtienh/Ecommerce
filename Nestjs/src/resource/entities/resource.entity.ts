import { EUpdator, EUpdatorFields } from '@/lib/entity-base'
import { TypeAccessConvert } from '@/lib/utils'
import { Column, Entity } from 'typeorm'

@Entity({ name: 'resources' })
export class Resource extends EUpdator {
  @Column({ unique: true })
  name: string

  @Column()
  description: string
}

export const resourceFields = {
  ...EUpdatorFields,
  name: TypeAccessConvert.STRING,
  description: TypeAccessConvert.STRING
}

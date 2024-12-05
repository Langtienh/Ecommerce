import { PartialType } from '@nestjs/mapped-types'
import { CreateResourceDto } from './create-resource.dto'

export class UpdateReourceDto extends PartialType(CreateResourceDto) {}

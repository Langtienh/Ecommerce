import { IsNotEmpty, MaxLength } from 'class-validator'

export class CreateResourceDto {
  @MaxLength(63)
  @IsNotEmpty()
  name: string

  @MaxLength(63)
  @IsNotEmpty()
  description: string
}

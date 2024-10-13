import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateGroupDto {
  @MaxLength(63)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsInt()
  @IsNotEmpty()
  resourceId: number
}

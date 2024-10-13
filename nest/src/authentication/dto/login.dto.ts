import { OmitType } from '@nestjs/mapped-types'
import { RegisterDto } from './register.dto'

export class loginDto extends OmitType(RegisterDto, ['name', 'phone'] as const) {}

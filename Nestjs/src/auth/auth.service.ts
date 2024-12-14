import { UserService } from '@/users/user.service'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Otp } from './entities'
import { JwtServiceCustom } from './jwt/jwt.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
    private jwtServiceCustom: JwtServiceCustom,
    private readonly userService: UserService
  ) {}
}

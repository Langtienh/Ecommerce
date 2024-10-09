import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserStatus } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    return hash(password, salt);
  }

  comparePassword(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }

  async isEmailExist(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user) {
      throw new ConflictException('Email already exists');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    await this.isEmailExist(createUserDto.email);
    const password = await this.hashPassword(createUserDto.password);
    return this.userRepo.save({ ...createUserDto, password });
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const updatedUser = this.userRepo.create(updateUserDto);
    Object.assign(user, updatedUser);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.softDelete(id);
  }

  async updatePassword(userId: number, password: string) {
    const hashedPassword = await this.hashPassword(password);
    const user = await this.findOne(userId);
    const isPasswordMatch = await this.comparePassword(password, user.password);
    if (isPasswordMatch) {
      throw new ConflictException(
        'New password must be different from old password',
      );
    }
    return this.userRepo.save({ ...user, password: hashedPassword });
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    if (oldPassword === newPassword) {
      throw new ConflictException(
        'New password must be different from old password',
      );
    }
    const user = await this.findOne(userId);
    const isPasswordMatch = await this.comparePassword(
      oldPassword,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new ConflictException('Old password is incorrect');
    }

    user.password = await this.hashPassword(newPassword);
    return this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async verifyAccount(userId: number) {
    const user = await this.findOne(userId);
    return this.userRepo.save({ ...user, status: UserStatus.VERIFY });
  }
}

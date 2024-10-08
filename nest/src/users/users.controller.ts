import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReponseMessage } from 'src/decorator/customize';
import { ParamIdDto } from 'src/lib/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ReponseMessage('User created successfully')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ReponseMessage('Get all users successfully')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ReponseMessage('Get user by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto) {
    return this.usersService.findOne(id);
  }

  @ReponseMessage('Update user successfully')
  @Patch(':id')
  update(@Param() { id }: ParamIdDto, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ReponseMessage('Delete user successfully')
  @Delete(':id')
  remove(@Param() { id }: ParamIdDto) {
    return this.usersService.remove(id);
  }
}

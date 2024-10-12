import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParamIdDto } from 'src/base/query-helper';
import { Public, ReponseMessage } from 'src/decorator/customize';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUser } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @ReponseMessage('User created successfully')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @ReponseMessage('Get all users successfully')
  @Get()
  findAll(@Query() query: QueryUser) {
    return this.usersService.findAll(query);
  }

  @Public()
  @ReponseMessage('Get user by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto) {
    return this.usersService.findOne(id);
  }

  @ReponseMessage('Update user successfully')
  @Patch(':id')
  update(@Param() { id }: ParamIdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ReponseMessage('Delete user successfully')
  @Delete(':id')
  remove(@Param() { id }: ParamIdDto) {
    return this.usersService.remove(id);
  }
}

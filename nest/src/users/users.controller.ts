import { ParamIdDto, QueryIdsDto } from '@/base/query-helper'
import { ReponseMessage } from '@/decorator/customize'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { QueryUser } from './dto/query-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ReponseMessage('Tạo mới user thành công')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @ReponseMessage('Get all users successfully')
  @Get()
  findAll(@Query() query: QueryUser) {
    return this.usersService.findAll(query)
  }

  @ReponseMessage('Get user by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto) {
    return this.usersService.findOne(id)
  }

  @ReponseMessage('Cập nhật user thành công')
  @Patch(':id')
  update(@Param() { id }: ParamIdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @ReponseMessage('Xóa user thành công')
  @Delete(':id')
  remove(@Param() { id }: ParamIdDto, @Query('softDelete') softDelete?: string, @Query() a?: string) {
    return this.usersService.remove(id, softDelete === 'true')
  }

  @ReponseMessage('Xóa user thành công')
  @Delete()
  removeMany(@Query() { ids }: QueryIdsDto, @Query('softDelete') softDelete?: string) {
    return this.usersService.removeMany(ids, softDelete === 'true')
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ICrudController } from '@/core/crud/crud.interface'
import { ReponseMessage } from '@/decorator/customize'
import { ParamIdDto, QueryIdsDto } from '@/lib/query-helper/query.interface'
import { PaginationQuery } from '@/lib/query-helper/query.interface'

@Controller('users')
export class UserController implements ICrudController {
  constructor(private readonly userService: UserService) {}

  @ReponseMessage('Tạo mới user thành công')
  @Post()
  create(@Body() data: CreateUserDto): Promise<any> {
    return this.userService.create(data)
  }

  @ReponseMessage('Xóa user thành công')
  @Delete(':id')
  delete(@Param() { id }: ParamIdDto): Promise<any> {
    return this.userService.delete(id)
  }

  @ReponseMessage('Xóa user thành công')
  @Delete()
  deleteMany(@Query() { ids }: QueryIdsDto): Promise<any> {
    return this.userService.deleteMany(ids)
  }

  @ReponseMessage('Get all users successfully')
  @Get()
  findMany(@Query() query: PaginationQuery): Promise<any> {
    return this.userService.findMany(query)
  }

  @ReponseMessage('Get user by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto): Promise<any> {
    return this.userService.findOne(id)
  }

  @ReponseMessage('Cập nhật user thành công')
  @Patch(':id')
  update(@Param() { id }: ParamIdDto, @Body() data: UpdateUserDto): Promise<any> {
    return this.userService.update(id, data)
  }
}

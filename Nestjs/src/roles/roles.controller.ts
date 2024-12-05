import { ReponseMessage } from '@/decorator/customize'
import { PaginationQuery, ParamIdDto, QueryIdsDto } from '@/lib/query-helper'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { IRolesController } from './abstract'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RolesService } from './roles.service'

@Controller('roles')
export class RolesController implements IRolesController {
  constructor(private readonly rolesService: RolesService) {}
  @ReponseMessage('Tạo mới role thành công')
  @Post()
  create(@Body() data: CreateRoleDto): Promise<any> {
    return this.rolesService.create(data)
  }

  @ReponseMessage('Xóa role thành công')
  @Delete(':id')
  delete(@Param() { id }: ParamIdDto): Promise<any> {
    return this.rolesService.delete(id)
  }

  @ReponseMessage('Xóa role thành công')
  @Delete()
  deleteMany(@Query() { ids }: QueryIdsDto): Promise<any> {
    return this.rolesService.deleteMany(ids)
  }

  @ReponseMessage('Get all users successfully')
  @Get()
  findMany(@Query() query: PaginationQuery): Promise<any> {
    return this.rolesService.findMany(query)
  }

  @ReponseMessage('Get role by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto): Promise<any> {
    return this.rolesService.findOne(id)
  }

  @ReponseMessage('Cập nhật role thành công')
  @Patch(':id')
  update(@Param() { id }: ParamIdDto, @Body() data: UpdateRoleDto): Promise<any> {
    return this.rolesService.update(id, data)
  }
}

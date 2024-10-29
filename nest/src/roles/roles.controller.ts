import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ParamIdDto, QueryIdsDto } from 'src/base/query-helper'
import { Public, ReponseMessage } from 'src/decorator/customize'
import { CreateRoleDto } from './dto/create-role.dto'
import { QueryRoleDto } from './dto/query-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RolesService } from './roles.service'

@ApiTags('roles')
@Controller('authorization/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ReponseMessage('Tạo mới role thành công')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto)
  }

  @ReponseMessage('Find all roles successfully')
  @Get()
  findAll(@Query() query: QueryRoleDto) {
    return this.rolesService.findAll(query)
  }

  @ReponseMessage('Find role by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto) {
    return this.rolesService.findOne(id)
  }

  @ReponseMessage('Cập nhật role thành công')
  @Patch(':id')
  update(@Param() { id }: ParamIdDto, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto)
  }

  @ReponseMessage('Xóa role thành công')
  @Delete(':id')
  remove(@Param() { id }: ParamIdDto) {
    return this.rolesService.remove(id)
  }

  @ReponseMessage('Xóa role đã chọn thành công')
  @Delete()
  removeMany(@Query() { ids }: QueryIdsDto) {
    return this.rolesService.removeMany(ids)
  }

  // devlopment
  @Public()
  @ReponseMessage('Find all permissions successfully')
  @Get(':id/permissions')
  getRolePermissions(@Param() { id }: ParamIdDto) {
    return this.rolesService.getRolePermissions(id)
  }
}

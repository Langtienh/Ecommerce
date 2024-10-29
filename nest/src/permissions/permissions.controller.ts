import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ParamIdDto, QueryIdsDto } from 'src/base/query-helper'
import { ReponseMessage } from 'src/decorator/customize'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { QueryPremissionDto } from './dto/query-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { PermissionsService } from './permissions.service'

@ApiTags('permissions')
@Controller('authorization/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ReponseMessage('Tạo mới quyền thành công')
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto)
  }

  @ReponseMessage('Lấy danh sách quyền thành công')
  @Get()
  findAll(@Query() query: QueryPremissionDto) {
    return this.permissionsService.findAll(query)
  }

  @ReponseMessage('Lấy chi tiết quyền thành công')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto) {
    return this.permissionsService.findOne(id)
  }

  @ReponseMessage('Cập nhật quyền thành công')
  @Patch(':id')
  update(@Param() { id }: ParamIdDto, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(id, updatePermissionDto)
  }

  @ReponseMessage('Xóa quyền thành công')
  @Delete(':id')
  remove(@Param() { id }: ParamIdDto) {
    return this.permissionsService.remove(id)
  }

  @ReponseMessage('Xóa quyền đã chọn thành công')
  @Delete()
  removeMany(@Query() { ids }: QueryIdsDto) {
    return this.permissionsService.removeMany(ids)
  }
}

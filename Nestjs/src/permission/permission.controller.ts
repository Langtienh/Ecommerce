import { ICrudController } from '@/core/crud'
import { ReponseMessage } from '@/decorator/customize'
import { PaginationQuery, ParamIdDto, QueryIdsDto } from '@/lib/query-helper'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { CreatePermissionDto, UpdateReourceDto } from './dto'
import { PermissionService } from './permission.service'

@Controller('permissions')
export class PermissionController implements ICrudController {
  constructor(private readonly permissionService: PermissionService) {}
  @ReponseMessage('Tạo mới permission thành công')
  @Post()
  create(@Body() data: CreatePermissionDto): Promise<any> {
    return this.permissionService.create(data)
  }

  @ReponseMessage('Xóa permission thành công')
  @Delete(':id')
  delete(@Param() { id }: ParamIdDto): Promise<any> {
    return this.permissionService.delete(id)
  }

  @ReponseMessage('Xóa permission thành công')
  @Delete()
  deleteMany(@Query() { ids }: QueryIdsDto): Promise<any> {
    return this.permissionService.deleteMany(ids)
  }

  @ReponseMessage('Get all users successfully')
  @Get()
  findMany(@Query() query: PaginationQuery): Promise<any> {
    return this.permissionService.findMany(query)
  }

  @ReponseMessage('Get permission by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto): Promise<any> {
    return this.permissionService.findOne(id)
  }

  @ReponseMessage('Cập nhật permission thành công')
  @Patch(':id')
  update(@Param() { id }: ParamIdDto, @Body() data: UpdateReourceDto): Promise<any> {
    return this.permissionService.update(id, data)
  }
}

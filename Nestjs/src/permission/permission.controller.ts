import { ICrudController } from '@/core/crud'
import { ResponseMessage } from '@/decorator/customize'
import { PaginationQuery, ParamIdDto, QueryIdsDto } from '@/lib/query-helper'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { CreatePermissionDto, UpdateReourceDto } from './dto'
import { PermissionService } from './permission.service'

@Controller('permissions')
export class PermissionController implements ICrudController {
  constructor(private readonly permissionService: PermissionService) {}
  @ResponseMessage('Tạo mới permission thành công')
  @Post()
  create(@Body() data: CreatePermissionDto): Promise<any> {
    return this.permissionService.create(data)
  }

  @ResponseMessage('Xóa permission thành công')
  @Delete(':id')
  delete(@Param() { id }: ParamIdDto): Promise<any> {
    return this.permissionService.delete(id)
  }

  @ResponseMessage('Xóa permission thành công')
  @Delete()
  deleteMany(@Query() { ids }: QueryIdsDto): Promise<any> {
    return this.permissionService.deleteMany(ids)
  }

  @ResponseMessage('Get all users successfully')
  @Get()
  findMany(@Query() query: PaginationQuery): Promise<any> {
    return this.permissionService.findMany(query)
  }

  @ResponseMessage('Get permission by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto): Promise<any> {
    return this.permissionService.findOne(id)
  }

  @ResponseMessage('Cập nhật permission thành công')
  @Patch(':id')
  update(@Param() { id }: ParamIdDto, @Body() data: UpdateReourceDto): Promise<any> {
    return this.permissionService.update(id, data)
  }
}

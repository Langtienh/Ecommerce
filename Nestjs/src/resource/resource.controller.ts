import { ICrudController } from '@/core/crud'
import { ReponseMessage } from '@/decorator/customize'
import { PaginationQuery, ParamIdDto, QueryIdsDto } from '@/lib/query-helper'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { CreateResourceDto } from './dto/create-resource.dto'
import { UpdateReourceDto } from './dto/update-resource.dto'
import { ResourceService } from './resource.service'

@Controller('resources')
export class ResourceController implements ICrudController {
  constructor(private readonly resourceService: ResourceService) {}
  @ReponseMessage('Tạo mới resource thành công')
  @Post()
  create(@Body() data: CreateResourceDto): Promise<any> {
    return this.resourceService.create(data)
  }

  @ReponseMessage('Xóa resource thành công')
  @Delete(':id')
  delete(@Param() { id }: ParamIdDto): Promise<any> {
    return this.resourceService.delete(id)
  }

  @ReponseMessage('Xóa resource thành công')
  @Delete()
  deleteMany(@Query() { ids }: QueryIdsDto): Promise<any> {
    return this.resourceService.deleteMany(ids)
  }

  @ReponseMessage('Get all users successfully')
  @Get()
  findMany(@Query() query: PaginationQuery): Promise<any> {
    return this.resourceService.findMany(query)
  }

  @ReponseMessage('Get resource by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto): Promise<any> {
    return this.resourceService.findOne(id)
  }

  @ReponseMessage('Cập nhật resource thành công')
  @Patch(':id')
  update(@Param() { id }: ParamIdDto, @Body() data: UpdateReourceDto): Promise<any> {
    return this.resourceService.update(id, data)
  }
}

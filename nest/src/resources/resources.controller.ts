import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AccessTokenData } from 'src/authentication/types/token-payload'
import { ParamIdDto, QueryIdsDto } from 'src/base/query-helper'
import { AccessToken, Public, ReponseMessage } from 'src/decorator/customize'
import { CreateResourceDto } from './dto/create-resource.dto'
import { QueryResourceDto } from './dto/query-resource.dto'
import { UpdateResourceDto } from './dto/update-resource.dto'
import { ResourcesService } from './resources.service'

@ApiTags('resources')
@Controller('authorization/resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @ReponseMessage('Tạo resource thành công')
  @Post()
  create(@Body() createResourceDto: CreateResourceDto, @AccessToken() data: AccessTokenData) {
    return this.resourcesService.create(createResourceDto, data.id)
  }

  @ReponseMessage('Get all resources successfully')
  @Get()
  findAll(@Query() query: QueryResourceDto) {
    return this.resourcesService.findAll(query)
  }

  @ReponseMessage('Get resource by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto) {
    return this.resourcesService.findOne(id)
  }

  @ReponseMessage('Cập nhật resource thành công')
  @Patch(':id')
  update(
    @Param() { id }: ParamIdDto,
    @Body() updateResourceDto: UpdateResourceDto,
    @AccessToken() data: AccessTokenData
  ) {
    return this.resourcesService.update(id, updateResourceDto, data.id)
  }

  @ReponseMessage('Xóa resource đã chọn thành công')
  @Delete(':id')
  remove(@Param() { id }: ParamIdDto) {
    return this.resourcesService.remove(id)
  }

  @ReponseMessage('Xóa resource đã chọn thành công')
  @Delete()
  removeMany(@Query() { ids }: QueryIdsDto) {
    return this.resourcesService.removeMany(ids)
  }

  @Public()
  @ReponseMessage('Get all permissions successfully')
  @Get(':id/permissions')
  getAllPermissions(@Param() { id }: ParamIdDto, @Query() query: QueryResourceDto) {
    return this.resourcesService.getAllPermissions(id, query)
  }
}

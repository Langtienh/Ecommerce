import { ParamIdDto } from '@/base/query-helper'
import { ReponseMessage } from '@/decorator/customize'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateGroupDto } from './dto/create-group.dto'
import { QueryGroupDto } from './dto/query-group.dto'
import { UpdateGroupDto } from './dto/update-group.dto'
import { GroupsService } from './groups.service'

@ApiTags('groups')
@Controller('authorization/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ReponseMessage('Tạo mới group thành công')
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto)
  }

  @ReponseMessage('Get all groups successfully')
  @Get()
  findAll(@Query() query: QueryGroupDto) {
    return this.groupsService.findAll(query)
  }

  @ReponseMessage('Get group by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto) {
    return this.groupsService.findOne(id)
  }

  @ReponseMessage('Cập nhật group thành công')
  @Patch(':id')
  update(@Param() { id }: ParamIdDto, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto)
  }

  @ReponseMessage('Xóa group thành công')
  @Delete(':id')
  remove(@Param() { id }: ParamIdDto) {
    return this.groupsService.remove(id)
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public, ReponseMessage } from 'src/decorator/customize';
import { ParamIdDto } from 'src/lib/utils';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';

@ApiTags('permissions')
@Controller('authorization/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ReponseMessage('Permission created successfully')
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Public()
  @ReponseMessage('Get all permissions successfully')
  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Public()
  @ReponseMessage('Get permission by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto) {
    return this.permissionsService.findOne(id);
  }

  @ReponseMessage('Update permission successfully')
  @Patch(':id')
  update(
    @Param() { id }: ParamIdDto,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @ReponseMessage('Delete permission successfully')
  @Delete(':id')
  remove(@Param() { id }: ParamIdDto) {
    return this.permissionsService.remove(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParamIdDto } from 'src/base/query-helper';
import { Public, ReponseMessage } from 'src/decorator/customize';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('authorization/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ReponseMessage('Role created successfully')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Public()
  @ReponseMessage('Find all roles successfully')
  @Get()
  findAll(@Query() query: QueryRoleDto) {
    return this.rolesService.findAll(query);
  }

  @Public()
  @ReponseMessage('Find role by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto) {
    return this.rolesService.findOne(id);
  }

  @ReponseMessage('Role updated successfully')
  @Patch(':id')
  update(@Param() { id }: ParamIdDto, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @ReponseMessage('Role deleted successfully')
  @Delete(':id')
  remove(@Param() { id }: ParamIdDto) {
    return this.rolesService.remove(id);
  }
}

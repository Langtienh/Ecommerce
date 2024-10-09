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
import { AccessTokenData } from 'src/authentication/types/token-payload';
import { AccessToken, Public, ReponseMessage } from 'src/decorator/customize';
import { ParamIdDto } from 'src/lib/utils';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourcesService } from './resources.service';

@ApiTags('resources')
@Controller('authorization/resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @ReponseMessage('Resource created successfully')
  @Post()
  create(
    @Body() createResourceDto: CreateResourceDto,
    @AccessToken() data: AccessTokenData,
  ) {
    return this.resourcesService.create(createResourceDto, data.id);
  }

  @Public()
  @ReponseMessage('Get all resources successfully')
  @Get()
  findAll() {
    return this.resourcesService.findAll();
  }

  @Public()
  @ReponseMessage('Get resource by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto) {
    return this.resourcesService.findOne(id);
  }

  @ReponseMessage('Update resource successfully')
  @Patch(':id')
  update(
    @Param() { id }: ParamIdDto,
    @Body() updateResourceDto: UpdateResourceDto,
    @AccessToken() data: AccessTokenData,
  ) {
    return this.resourcesService.update(id, updateResourceDto, data.id);
  }

  @ReponseMessage('Delete resource successfully')
  @Delete(':id')
  remove(@Param() { id }: ParamIdDto) {
    return this.resourcesService.remove(id);
  }
}

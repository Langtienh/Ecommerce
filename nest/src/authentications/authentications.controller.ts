import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';

@Controller('authentications')
export class AuthenticationsController {
  constructor(private readonly authenticationsService: AuthenticationsService) {}

  @Post()
  create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authenticationsService.create(createAuthenticationDto);
  }

  @Get()
  findAll() {
    return this.authenticationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authenticationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthenticationDto: UpdateAuthenticationDto) {
    return this.authenticationsService.update(+id, updateAuthenticationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authenticationsService.remove(+id);
  }
}

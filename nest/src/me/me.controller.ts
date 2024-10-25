import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AccessTokenData } from 'src/authentication/types/token-payload'
import { AccessToken, ReponseMessage } from 'src/decorator/customize'
import { UpdateUserDto } from 'src/users/dto/update-user.dto'
import { UsersService } from 'src/users/users.service'
import { AddressService } from './address.services'
import { CreateAddressDto } from './dto/create-address.dto'

@ApiTags('me')
@Controller('me')
export class MeController {
  constructor(
    private userService: UsersService,
    private addressService: AddressService
  ) {}
  @ReponseMessage('Lấy thông tin cá nhân thành công')
  @Get()
  async getMe(@AccessToken() user: AccessTokenData) {
    return this.userService.findOne(user.id)
  }

  @ReponseMessage('Cập nhật thông tin cá nhân thành công')
  @Put()
  async updateMe(@AccessToken() user: AccessTokenData, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto)
  }

  @ReponseMessage('Thêm địa chỉ thành công')
  @Post('address')
  async createAddress(@AccessToken() user: AccessTokenData, @Body() body: CreateAddressDto) {
    return this.addressService.create(user.id, body)
  }

  @ReponseMessage('Cập nhật địa chỉ thành công')
  @Put('address/:id')
  async updateAddress(@AccessToken() user: AccessTokenData, @Body() body, @Param('id') addressId: string) {
    return this.addressService.update(user.id, +addressId, body)
  }

  @ReponseMessage('Xóa địa chỉ thành công')
  @Delete('address/:id')
  async deleteAddress(@AccessToken() user: AccessTokenData, @Param('id') addressId: string) {
    return this.addressService.delete(user.id, +addressId)
  }

  @ReponseMessage('Lấy danh sách địa chỉ thành công')
  @Get('address')
  async getAddress(@AccessToken() user: AccessTokenData) {
    return this.addressService.findAll(user.id)
  }

  @ReponseMessage('Lấy thông tin địa chỉ thành công')
  @Get('address/:id')
  async getAddressById(@AccessToken() user: AccessTokenData, @Param('id') addressId: string) {
    return this.addressService.findOne(user.id, +addressId)
  }
}

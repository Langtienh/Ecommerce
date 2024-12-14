import { AccessTokenData } from '@/auth/jwt/jwt.interface'
import { AccessToken, ResponseMessage } from '@/decorator/customize'
import { ParamIdDto, QueryIdsDto } from '@/lib/query-helper'
import { UpdateUserDto } from '@/users/dto'
import { UserService } from '@/users/user.service'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { AddressService } from './address.services'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'

@Controller('me')
export class MeController {
  constructor(
    private userService: UserService,
    private addressService: AddressService
  ) {}
  @ResponseMessage('Lấy thông tin cá nhân thành công')
  @Get()
  async getMe(@AccessToken() user: AccessTokenData) {
    return this.userService.findOne(user.id)
  }

  @ResponseMessage('Cập nhật thông tin cá nhân thành công')
  @Patch()
  async updateMe(@AccessToken() user: AccessTokenData, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto)
  }

  @ResponseMessage('Thêm địa chỉ thành công')
  @Post('address')
  async createAddress(@AccessToken() user: AccessTokenData, @Body() body: CreateAddressDto) {
    return this.addressService.create(user.id, body)
  }

  @ResponseMessage('Cập nhật địa chỉ thành công')
  @Patch('address/:id')
  async updateAddress(
    @AccessToken() user: AccessTokenData,
    @Body() body: UpdateAddressDto,
    @Param() { id }: ParamIdDto
  ) {
    return this.addressService.update(user.id, id, body)
  }

  @ResponseMessage('Xóa địa chỉ thành công')
  @Delete('address/:id')
  async deleteAddress(@AccessToken() user: AccessTokenData, @Param() { id }: ParamIdDto) {
    return this.addressService.delete(user.id, id)
  }

  @ResponseMessage('Lấy danh sách địa chỉ thành công')
  @Get('address')
  async getAddress(@AccessToken() user: AccessTokenData) {
    return this.addressService.findAll(user.id)
  }

  @ResponseMessage('Lấy thông tin địa chỉ thành công')
  @Get('address/:id')
  async getAddressById(@AccessToken() user: AccessTokenData, @Param() { id }: ParamIdDto) {
    return this.addressService.findOne(user.id, id)
  }

  @ResponseMessage('Xóa nhiều địa chỉ thành công')
  @Delete('address')
  async deleteManyAddress(@AccessToken() user: AccessTokenData, @Query() { ids }: QueryIdsDto) {
    return this.addressService.deleteMany(user.id, ids)
  }
}

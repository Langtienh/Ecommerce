// import { ICrudController } from '@/core/crud'
// import { ResponseMessage } from '@/decorator/customize'
// import { PaginationQuery, ParamIdDto, QueryIdsDto } from '@/lib/query-helper'
// import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'

// @Controller('users')
// export class UserController implements ICrudController {
//   constructor(private readonly userService: UserService) {}

//   @ResponseMessage('Tạo mới user thành công')
//   @Post()
//   create(@Body() data: CreateUserDto): Promise<any> {
//     const {} = data
//     return this.userService.create({})
//   }

//   @ResponseMessage('Xóa user thành công')
//   @Delete(':id')
//   delete(@Param() { id }: ParamIdDto): Promise<any> {
//     return this.userService.delete(id)
//   }

//   @ResponseMessage('Xóa user thành công')
//   @Delete()
//   deleteMany(@Query() { ids }: QueryIdsDto): Promise<any> {
//     return this.userService.deleteMany(ids)
//   }

//   @ResponseMessage('Get all users successfully')
//   @Get()
//   findMany(@Query() query: PaginationQuery): Promise<any> {
//     return this.userService.findMany(query)
//   }

//   @ResponseMessage('Get user by id successfully')
//   @Get(':id')
//   findOne(@Param() { id }: ParamIdDto): Promise<any> {
//     return this.userService.findOne(id)
//   }

//   @ResponseMessage('Cập nhật user thành công')
//   @Patch(':id')
//   update(@Param() { id }: ParamIdDto, @Body() data: UpdateUserDto): Promise<any> {
//     const {} = data
//     return this.userService.update(id, {})
//   }
// }

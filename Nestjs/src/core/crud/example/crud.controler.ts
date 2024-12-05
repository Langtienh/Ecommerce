// import { ICrudController } from '@/core/crud'
// import { ReponseMessage } from '@/decorator/customize'
// import { PaginationQuery, ParamIdDto, QueryIdsDto } from '@/lib/query-helper'
// import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'

// @Controller('users')
// export class UserController implements ICrudController {
//   constructor(private readonly userService: UserService) {}

//   @ReponseMessage('Tạo mới user thành công')
//   @Post()
//   create(@Body() data: CreateUserDto): Promise<any> {
//     const {} = data
//     return this.userService.create({})
//   }

//   @ReponseMessage('Xóa user thành công')
//   @Delete(':id')
//   delete(@Param() { id }: ParamIdDto): Promise<any> {
//     return this.userService.delete(id)
//   }

//   @ReponseMessage('Xóa user thành công')
//   @Delete()
//   deleteMany(@Query() { ids }: QueryIdsDto): Promise<any> {
//     return this.userService.deleteMany(ids)
//   }

//   @ReponseMessage('Get all users successfully')
//   @Get()
//   findMany(@Query() query: PaginationQuery): Promise<any> {
//     return this.userService.findMany(query)
//   }

//   @ReponseMessage('Get user by id successfully')
//   @Get(':id')
//   findOne(@Param() { id }: ParamIdDto): Promise<any> {
//     return this.userService.findOne(id)
//   }

//   @ReponseMessage('Cập nhật user thành công')
//   @Patch(':id')
//   update(@Param() { id }: ParamIdDto, @Body() data: UpdateUserDto): Promise<any> {
//     const {} = data
//     return this.userService.update(id, {})
//   }
// }

import { CrudAndSoft } from '@/lib/crud'
import { AddUserType, UpdateUserType, UserDetail } from './user.schema'

export class UserRequest extends CrudAndSoft<
  UserDetail,
  UserDetail,
  UserDetail,
  AddUserType,
  UpdateUserType
> {}

export const userRequest = new UserRequest('users')

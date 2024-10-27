import { HTTP_METHOD } from 'src/permissions/entities/permission.entity'

export const permissionInitialized: {
  name: string
  apiPath: string
  method: HTTP_METHOD
  isActive: boolean
  groupId: number
}[] = [
  {
    name: 'Delete many group',
    apiPath: 'api/v1/authorization/groups',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Get many group',
    apiPath: 'api/v1/authorization/groups',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Add group',
    apiPath: 'api/v1/authorization/groups',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 1
  },
  {
    name: 'Update group',
    apiPath: 'api/v1/authorization/groups/:id',
    method: HTTP_METHOD.PATCH,
    isActive: true,
    groupId: 2
  },
  {
    name: 'Get group',
    apiPath: 'api/v1/authorization/groups/:id',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Delete group',
    apiPath: 'api/v1/authorization/groups/:id',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Add permission',
    apiPath: 'api/v1/authorization/permission',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 1
  },
  {
    name: 'Delete many permission',
    apiPath: 'api/v1/authorization/permission',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Get many permission',
    apiPath: 'api/v1/authorization/permission',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Update permission',
    apiPath: 'api/v1/authorization/permission/:id',
    method: HTTP_METHOD.PATCH,
    isActive: true,
    groupId: 2
  },
  {
    name: 'Delete permission',
    apiPath: 'api/v1/authorization/permission/:id',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Get permission',
    apiPath: 'api/v1/authorization/permission/:id',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Gell many resource',
    apiPath: 'api/v1/authorization/resources',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Add resource',
    apiPath: 'api/v1/authorization/resources',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 1
  },
  {
    name: 'Get resource',
    apiPath: 'api/v1/authorization/resources',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Delete many resource',
    apiPath: 'api/v1/authorization/resources',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Update resource',
    apiPath: 'api/v1/authorization/resources/:id',
    method: HTTP_METHOD.PATCH,
    isActive: true,
    groupId: 2
  },
  {
    name: 'Delete resource',
    apiPath: 'api/v1/authorization/resources/:id',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Get many role',
    apiPath: 'api/v1/authorization/roles',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  },
  {
    name: 'Add roles',
    apiPath: 'api/v1/authorization/roles',
    method: HTTP_METHOD.POST,
    isActive: true,
    groupId: 1
  },
  {
    name: 'Delete roles',
    apiPath: 'api/v1/authorization/roles/:id',
    method: HTTP_METHOD.DELETE,
    isActive: true,
    groupId: 3
  },
  {
    name: 'Update role',
    apiPath: 'api/v1/authorization/roles/:id',
    method: HTTP_METHOD.PATCH,
    isActive: true,
    groupId: 2
  },
  {
    name: 'Get role detail',
    apiPath: 'api/v1/authorization/roles:/id',
    method: HTTP_METHOD.GET,
    isActive: true,
    groupId: 4
  }
]

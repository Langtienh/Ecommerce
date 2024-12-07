import { HTTP_METHOD, PERMISSION_GROUP } from '@/permission/entities/permission.entity'

export const permissionInitialized: {
  name: string
  resourceId: number
  method: HTTP_METHOD
  apiPath: string
  group: PERMISSION_GROUP
}[] = [
  {
    name: 'Role',
    resourceId: 1,
    method: HTTP_METHOD.GET,
    apiPath: '/api/v1/roles/:id',
    group: PERMISSION_GROUP.VIEW
  },
  {
    name: 'Role',
    resourceId: 1,
    method: HTTP_METHOD.GET,
    apiPath: '/api/v1/roles',
    group: PERMISSION_GROUP.VIEW
  },
  {
    name: 'Role',
    resourceId: 1,
    method: HTTP_METHOD.POST,
    apiPath: '/api/v1/roles',
    group: PERMISSION_GROUP.CREATE
  },
  {
    name: 'Role',
    resourceId: 1,
    method: HTTP_METHOD.PATCH,
    apiPath: '/api/v1/roles/:id',
    group: PERMISSION_GROUP.Update
  },
  {
    name: 'Role',
    resourceId: 1,
    method: HTTP_METHOD.DELETE,
    apiPath: '/api/v1/roles/:id',
    group: PERMISSION_GROUP.DELETE
  },
  {
    name: 'Role',
    resourceId: 1,
    method: HTTP_METHOD.DELETE,
    apiPath: '/api/v1/roles',
    group: PERMISSION_GROUP.DELETE
  },
  {
    name: 'Permission',
    resourceId: 2,
    method: HTTP_METHOD.GET,
    apiPath: '/api/v1/permissions/:id',
    group: PERMISSION_GROUP.VIEW
  },
  {
    name: 'Permission',
    resourceId: 2,
    method: HTTP_METHOD.GET,
    apiPath: '/api/v1/permissions',
    group: PERMISSION_GROUP.VIEW
  },
  {
    name: 'Permission',
    resourceId: 2,
    method: HTTP_METHOD.POST,
    apiPath: '/api/v1/permissions',
    group: PERMISSION_GROUP.CREATE
  },
  {
    name: 'Permission',
    resourceId: 2,
    method: HTTP_METHOD.PATCH,
    apiPath: '/api/v1/permissions/:id',
    group: PERMISSION_GROUP.Update
  },
  {
    name: 'Permission',
    resourceId: 2,
    method: HTTP_METHOD.DELETE,
    apiPath: '/api/v1/permissions/:id',
    group: PERMISSION_GROUP.DELETE
  },
  {
    name: 'Permission',
    resourceId: 2,
    method: HTTP_METHOD.DELETE,
    apiPath: '/api/v1/permissions',
    group: PERMISSION_GROUP.DELETE
  },
  {
    name: 'Resource',
    resourceId: 3,
    method: HTTP_METHOD.GET,
    apiPath: '/api/v1/resources/:id',
    group: PERMISSION_GROUP.VIEW
  },
  {
    name: 'Resource',
    resourceId: 3,
    method: HTTP_METHOD.GET,
    apiPath: '/api/v1/resources',
    group: PERMISSION_GROUP.VIEW
  },
  {
    name: 'Resource',
    resourceId: 3,
    method: HTTP_METHOD.POST,
    apiPath: '/api/v1/resources',
    group: PERMISSION_GROUP.CREATE
  },
  {
    name: 'Resource',
    resourceId: 3,
    method: HTTP_METHOD.PATCH,
    apiPath: '/api/v1/resources/:id',
    group: PERMISSION_GROUP.Update
  },
  {
    name: 'Resource',
    resourceId: 3,
    method: HTTP_METHOD.DELETE,
    apiPath: '/api/v1/resources/:id',
    group: PERMISSION_GROUP.DELETE
  },
  {
    name: 'Resource',
    resourceId: 3,
    method: HTTP_METHOD.DELETE,
    apiPath: '/api/v1/resources',
    group: PERMISSION_GROUP.DELETE
  },
  {
    name: 'User',
    resourceId: 4,
    method: HTTP_METHOD.GET,
    apiPath: '/api/v1/users/:id',
    group: PERMISSION_GROUP.VIEW
  },
  {
    name: 'User',
    resourceId: 4,
    method: HTTP_METHOD.GET,
    apiPath: '/api/v1/users',
    group: PERMISSION_GROUP.VIEW
  },
  {
    name: 'User',
    resourceId: 4,
    method: HTTP_METHOD.POST,
    apiPath: '/api/v1/users',
    group: PERMISSION_GROUP.CREATE
  },
  {
    name: 'User',
    resourceId: 4,
    method: HTTP_METHOD.PATCH,
    apiPath: '/api/v1/users/:id',
    group: PERMISSION_GROUP.Update
  },
  {
    name: 'User',
    resourceId: 4,
    method: HTTP_METHOD.DELETE,
    apiPath: '/api/v1/users/:id',
    group: PERMISSION_GROUP.DELETE
  },
  {
    name: 'User',
    resourceId: 4,
    method: HTTP_METHOD.DELETE,
    apiPath: '/api/v1/users/soft-delete/:id',
    group: PERMISSION_GROUP.SOFT_DELETE
  },
  {
    name: 'User',
    resourceId: 4,
    method: HTTP_METHOD.DELETE,
    apiPath: '/api/v1/users',
    group: PERMISSION_GROUP.DELETE
  }
]

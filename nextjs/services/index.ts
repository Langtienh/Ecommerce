import groupRequestApi from './group-request-api'
import meRequestApi from './me-request-api'
import permissionRequestApi from './permission-request-api'
import resourceRequestApi from './resource-request-api'
import roleRequestApi from './role-request-api'
import userRequestApi from './user-request-api'

export const requestApi = {
  user: userRequestApi,
  role: roleRequestApi,
  permission: permissionRequestApi,
  resource: resourceRequestApi,
  group: groupRequestApi,
  me: meRequestApi
}

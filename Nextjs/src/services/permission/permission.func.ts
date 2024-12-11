import { PermissionDetail, PermissionFormatResource } from './permission.schema'

export type GroupPermissionsType = 'group' | 'method' | 'resource'

export const groupPermissions = (
  permissions: PermissionDetail[],
  groupPermissionsType: GroupPermissionsType
) => {
  const newType = groupPermissionsType === 'resource' ? 'resourceIdName' : groupPermissionsType
  const groupObject: { [key: string]: PermissionDetail[] } = {}
  permissionFormatResource(permissions).forEach((permission) => {
    const key = permission[newType]
    if (!groupObject[key]) groupObject[key] = []
    groupObject[key].push(permission)
  })
  return Object.entries(groupObject).map(([key, value]) => ({
    name: key,
    permissions: value
  }))
}

export const permissionFormatResource = (
  permissions: PermissionDetail[]
): PermissionFormatResource[] => {
  return permissions.map((permission) => ({
    ...permission,
    resourceIdName: `${permission.resourceId}-${permission.resource.name}`
  }))
}

export const getResourceForResourceIdName = ({ resourceIdName }: { resourceIdName: string }) => {
  const [resourceId, resourceName] = resourceIdName.split('-')
  if (!resourceId || !resourceName) throw new Error('Invalid resourceIdName')
  return { resourceId, resourceName }
}

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { HTTP_METHOD, HTTP_METHOD_VALUES, PERMISSION_GROUP_VALUES } from '@/services/permission'

export const PermissionStatus = ({ isActive }: { isActive: boolean }) => {
  if (isActive)
    return (
      <Badge variant='outline' className='font-bold text-green-600'>
        Active
      </Badge>
    )
  return <Badge variant='outline'>Disable</Badge>
}

const HTTP_METHOD_COLOR: Record<HTTP_METHOD, string> = {
  DELETE: 'text-red-600',
  GET: 'text-blue-600',
  POST: 'text-green-600',
  PUT: 'text-yellow-600',
  PATCH: 'text-fuchsia-600'
}

export const PermissionMethod = ({ method }: { method: HTTP_METHOD }) => (
  <span className={cn('font-bold uppercase', HTTP_METHOD_COLOR[method])}>{method}</span>
)

export const HTTP_METHOD_OPTIONS = HTTP_METHOD_VALUES.map((method) => ({
  item: <PermissionMethod method={method} />,
  value: method
}))

export const PERMISSION_STATUS = {
  ACTIVE: true,
  DISABLE: false
}

export const PERMISSION_STATUS_VALUE = Object.values(PERMISSION_STATUS)

export const PERMISSION_STATUS_OPTIONS = PERMISSION_STATUS_VALUE.map((status) => ({
  item: <PermissionStatus isActive={status} />,
  value: status
}))

export const PERMISSION_GROUP_OPTIONS = PERMISSION_GROUP_VALUES.map((group) => ({
  item: <>{group}</>,
  value: group
}))

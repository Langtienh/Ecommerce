import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export const PermissionStatus = ({ isActive }: { isActive: string }) => {
  if (isActive === 'true')
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

export enum HTTP_METHOD {
  DELETE = 'DELETE',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

export const HTTP_METHOD_VALUE = Object.values(HTTP_METHOD)

export const HTTP_METHOD_OPTIONS = HTTP_METHOD_VALUE.map((method) => ({
  item: <PermissionMethod method={method} />,
  value: method
}))

export const PERMISSION_STATUS = {
  ACTIVE: 'true',
  DISABLE: 'false'
}

export const PERMISSION_STATUS_VALUE = Object.values(PERMISSION_STATUS)

export const PERMISSION_STATUS_OPTIONS = PERMISSION_STATUS_VALUE.map((status) => ({
  item: <PermissionStatus isActive={status} />,
  value: status
}))

import { PermissionMethod } from '@/app/dashboard/permissions/components/permission.data'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { PermissionDetail } from '@/services/permission'

interface IPermissionCardProps {
  permission: PermissionDetail
  onCheckedChange: (permissionIds: number[], isChecked: boolean) => void
  isChecked: boolean
}

export const PermissionCard = ({
  permission,
  onCheckedChange,
  isChecked
}: IPermissionCardProps) => {
  return (
    <Card className='p-3 w-min min-w-[330px]'>
      <div className='font-bold text-base flex justify-between items-center'>
        <span>{permission.name}</span>
        <Switch checked={isChecked} onCheckedChange={(e) => onCheckedChange([permission.id], e)} />
      </div>
      <div className='flex gap-3 items-center text-sm'>
        <PermissionMethod method={permission.method} />
        <span>{permission.apiPath}</span>
      </div>
      <div>{`Group: ${permission.group}`}</div>
    </Card>
  )
}

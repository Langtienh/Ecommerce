import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { PermissionDetail } from '@/services/permission'
import { PermissionCard } from './permission-card'

interface IPermissionGroupItemProps {
  permissions: PermissionDetail[]
  onCheckedChange: (permissionIds: number[], isChecked: boolean) => void
  permissionSelectedIds: number[]
  groupName: string
}

export const PermissionGroupItem = ({
  groupName,
  onCheckedChange,
  permissions,
  permissionSelectedIds
}: IPermissionGroupItemProps) => {
  return (
    <AccordionItem value={`group-${groupName}`}>
      <AccordionTrigger className='flex items-center justify-between text-lg'>
        <span className='font-xl'>{`${groupName}`}</span>
      </AccordionTrigger>
      <AccordionContent>
        <div className='flex items-center space-x-2 pb-4'>
          <Switch
            checked={permissions.every((per) => permissionSelectedIds.includes(per.id))}
            onCheckedChange={(e) =>
              onCheckedChange(
                permissions.map((per) => per.id),
                e
              )
            }
            id={`group-${groupName}`}
          />
          <Label htmlFor={`group-${groupName}`}>Chọn tất cả</Label>
        </div>
        <Separator className='mb-3' />
        <div className='w-full flex flex-wrap gap-5 justify-between items-center'>
          {permissions.map((permission) => (
            <PermissionCard
              key={`permission-${permission.id}`}
              onCheckedChange={onCheckedChange}
              permission={permission}
              isChecked={permissionSelectedIds.includes(permission.id)}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

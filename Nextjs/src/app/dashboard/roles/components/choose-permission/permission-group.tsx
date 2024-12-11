import { Accordion } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { groupPermissions, GroupPermissionsType, PermissionDetail } from '@/services/permission'
import { useState } from 'react'
import { PermissionGroupItem } from './permission-group-item'

interface IPermissionGroupProps {
  permissions: PermissionDetail[]
  onCheckedChange: (permissionIds: number[], isChecked: boolean) => void
  permissionSelectedIds: number[]
}

const groupTypes: GroupPermissionsType[] = ['group', 'resource', 'method']

export const PermissionGroup = ({
  onCheckedChange,
  permissionSelectedIds,
  permissions
}: IPermissionGroupProps) => {
  const [groupType, setGroupType] = useState<GroupPermissionsType>('resource')

  const groups = groupPermissions(permissions, groupType)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quyền hạn</CardTitle>
        <CardDescription>Các quyền hạn được phép cho vai trò này</CardDescription>
        <CardContent className='px-0'>
          <div className='flex justify-end items-center'>
            <span className='mr-3'>Group by:</span>
            <Select
              value={groupType}
              onValueChange={(e) => setGroupType(e as GroupPermissionsType)}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Group by' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Group by</SelectLabel>
                  {groupTypes.map((type) => (
                    <SelectItem key={`group-type-${type}`} value={type}>
                      <span className='capitalize'>{type}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Accordion type='single' collapsible>
            {groups.map((group) => {
              return (
                <PermissionGroupItem
                  onCheckedChange={onCheckedChange}
                  groupName={group.name}
                  permissionSelectedIds={permissionSelectedIds}
                  permissions={group.permissions}
                  key={`group-${group.name}`}
                />
              )
            })}
          </Accordion>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

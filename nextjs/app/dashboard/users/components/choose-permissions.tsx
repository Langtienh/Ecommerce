import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { GroupDetail } from '@/services/group-request-api'
import { ResourceDetail } from '@/services/resource-request-api'
import { Fragment } from 'react'
import { PermissionMethod } from '../../permissions/components/data'

export interface ChangePermissionParams {
  permissionId?: number
  resource?: ResourceDetail
  group?: GroupDetail
  checked: boolean
}

export default function ChoosePermissions({
  resources,
  permissionIds,
  handleChangePermission
}: {
  resources: ResourceDetail[]
  permissionIds: number[]
  handleChangePermission: (params: ChangePermissionParams) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quyền hạn</CardTitle>
        <CardDescription>Các quyền hạn được phép cho vai trò này</CardDescription>
        <CardContent className='px-0'>
          <Accordion type='single' collapsible>
            {resources.map((resource) => {
              const isExistPermission =
                resource.groups.length > 0 && resource.groups.some((group) => group.permissions.length > 0)
              return (
                <AccordionItem key={`resource-${resource.id}`} value={`resource-${resource.id}`}>
                  <AccordionTrigger className='flex items-center justify-between text-lg'>
                    <span className='font-xl'>{`${resource.name} resource`}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {!isExistPermission ? (
                      <div>{`${resource.name} resource chưa có permission nào`}</div>
                    ) : (
                      <>
                        <div className='flex items-center space-x-2 pb-4'>
                          <Switch
                            checked={resource.groups.every((group) =>
                              group.permissions.every((per) => permissionIds.includes(per.id))
                            )}
                            onCheckedChange={(e) =>
                              handleChangePermission({
                                checked: e,
                                resource: resource
                              })
                            }
                            id={`resource-${resource.id}`}
                          />
                          <Label htmlFor={`resource-${resource.id}`}>Chọn tất cả</Label>
                        </div>
                        <Separator className='mb-3' />
                        <ul className='flex flex-wrap  justify-between gap-x-5 gap-y-3'>
                          {resource.groups.map((group) => (
                            <>
                              {group.permissions.length > 0 && (
                                <li
                                  key={`group--${group.id}`}
                                  className='flex items-center space-x-2 pb-4 min-w-[330px]'
                                >
                                  <Switch
                                    checked={group.permissions.every((per) => permissionIds.includes(per.id))}
                                    onCheckedChange={(e) =>
                                      handleChangePermission({
                                        checked: e,
                                        group: group
                                      })
                                    }
                                    id={`group--${group.id}`}
                                  />
                                  <Label htmlFor={`group--${group.id}`}>{`${group.name} group`}</Label>
                                </li>
                              )}
                            </>
                          ))}
                        </ul>
                        <div className='w-full flex flex-wrap gap-5 justify-between items-center'>
                          {resource.groups.map((group) => (
                            <Fragment key={`group-${group.id}`}>
                              {group.permissions.map((permission) => (
                                <Card key={`per-${permission.id}`} className='p-3 w-min min-w-[330px]'>
                                  <div className='font-bold text-base flex justify-between items-center'>
                                    <span>{permission.name}</span>
                                    <Switch
                                      checked={permissionIds.includes(permission.id)}
                                      onCheckedChange={(e) =>
                                        handleChangePermission({
                                          checked: e,
                                          permissionId: permission.id
                                        })
                                      }
                                    />
                                  </div>
                                  <div className='flex gap-3 items-center text-sm'>
                                    <PermissionMethod method={permission.method} />
                                    <span>{permission.apiPath}</span>
                                  </div>
                                  <div>{`Group: ${group.name}`}</div>
                                </Card>
                              ))}
                            </Fragment>
                          ))}
                        </div>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

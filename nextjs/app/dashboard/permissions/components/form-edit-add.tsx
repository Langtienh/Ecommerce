'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import { delayForm } from '@/lib/utils'
import { requestApi } from '@/services'
import { Group } from '@/services/group-request-api'
import { AddPermissionSchema, AddPermissionType, PermissionWittGroup } from '@/services/permission-request-api'
import { Resource } from '@/services/resource-request-api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { HTTP_METHOD_VALUE, PermissionMethod } from './data'

export default function FormPemission({
  permission,
  resources
}: {
  permission?: PermissionWittGroup
  resources: Resource[]
}) {
  const [resourceIdSelected, setResourceIdSelected] = useState<number | undefined>(undefined)
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    const fetchGroups = async () => {
      const resourceId = permission?.group.resourceId || resourceIdSelected
      if (resourceId) {
        const res = await requestApi.group.getMany({ resourceId, limit: -1 })
        setGroups(res.data.result)
      }
    }
    fetchGroups()
  }, [resourceIdSelected, permission])
  // 1. Define your form.
  const form = useForm<AddPermissionType>({
    resolver: zodResolver(AddPermissionSchema),
    defaultValues: {
      name: permission?.name || '',
      apiPath: permission?.apiPath || '',
      isActive: permission?.isActive || true,
      groupId: permission?.groupId,
      method: permission?.method
    }
  })
  // 2. handle loading, store global state
  const router = useRouter()
  const { isLoading, startLoading, finallyLoading } = useLoading()
  // 3. Define a submit handler.
  async function onSubmit(values: AddPermissionType) {
    startLoading()
    try {
      let res = undefined
      if (permission) {
        res = await requestApi.permission.update(permission.id, values)
      } else res = await requestApi.permission.add(values)
      await delayForm()
      toast.success(res.message)
      router.push('/dashboard/permissions')
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      finallyLoading()
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Nhập tên permission' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='apiPath'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Nhập api path' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-wrap justify-between items-center gap-y-8'>
          <FormField
            control={form.control}
            name='method'
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-[200px]'>
                      <SelectValue placeholder='Method' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {HTTP_METHOD_VALUE.map((method) => (
                      <SelectItem key={method} value={method}>
                        <PermissionMethod method={method} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Select
            value={resourceIdSelected?.toString() || permission?.group.resourceId.toString()}
            onValueChange={(value) => {
              setResourceIdSelected(Number(value))
            }}
          >
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Resource' />
            </SelectTrigger>
            <SelectContent>
              {resources.map((resource) => (
                <SelectItem key={resource.id} value={resource.id.toString()}>
                  {resource.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormField
            control={form.control}
            name='groupId'
            render={({ field }) => (
              <FormItem>
                <Select
                  disabled={!resourceIdSelected && !permission}
                  onValueChange={(value) => field.onChange(+value)}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className='w-[200px]'>
                      <SelectValue placeholder='Group' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {groups.length ? (
                      groups.map((group) => (
                        <SelectItem key={group.id} value={group.id.toString()}>
                          {group.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className='w-full py-1 text-center text-gray-500'>No result</div>
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isActive'
            render={({ field }) => (
              <FormItem className='flex items-center gap-3'>
                <>
                  <FormLabel>Enable/Disable</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </>
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isLoading} type='submit' className='w-full'>
          {permission ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </form>
    </Form>
  )
}

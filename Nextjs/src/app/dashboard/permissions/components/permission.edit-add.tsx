'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import useLoading from '@/hooks/use-loading'
import { serverRevalidatePath, SeverRedirect } from '@/lib/action'
import { handleErrorApi } from '@/lib/handle-request'
import {
  AddPermissionSchema,
  AddPermissionType,
  HTTP_METHOD_VALUES,
  PERMISSION_GROUP_VALUES,
  PermissionDetail,
  permissionRequest
} from '@/services/permission'
import { Resource } from '@/services/resource'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { PermissionMethod } from './permission.data'

export default function FormPemission({
  permission,
  resources
}: {
  permission?: PermissionDetail
  resources: Resource[]
}) {
  // 1. Define your form.
  const form = useForm<AddPermissionType>({
    resolver: zodResolver(AddPermissionSchema),
    defaultValues: {
      name: permission?.name || '',
      apiPath: permission?.apiPath || '',
      isActive: permission?.isActive || true,
      group: permission?.group,
      method: permission?.method,
      resourceId: permission?.resource.id
    }
  })
  // 2. handle loading, store global state
  const { isLoading, startLoading, finallyLoading } = useLoading()
  // 3. Define a submit handler.
  async function onSubmit(values: AddPermissionType) {
    startLoading()
    try {
      let res = undefined
      if (permission) {
        res = await permissionRequest.update(permission.id, values)
      } else res = await permissionRequest.create(values)
      toast.success(res.message)
      await serverRevalidatePath('/api/permissions')
      await SeverRedirect('/dashboard/permissions?sort=-updatedAt')
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
                    {HTTP_METHOD_VALUES.map((method) => (
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

          <FormField
            control={form.control}
            name='group'
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-[200px]'>
                      <SelectValue placeholder='Group' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PERMISSION_GROUP_VALUES.map((group) => (
                      <SelectItem key={group} value={group}>
                        <>{group}</>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='resourceId'
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(values) => field.onChange(+values)}
                  defaultValue={`${field.value}`}
                >
                  <FormControl>
                    <SelectTrigger className='w-[200px]'>
                      <SelectValue placeholder='Resource' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {resources.map((resource) => (
                      <SelectItem key={`res${resource.id}`} value={`${resource.id}`}>
                        <>{resource.name}</>
                      </SelectItem>
                    ))}
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

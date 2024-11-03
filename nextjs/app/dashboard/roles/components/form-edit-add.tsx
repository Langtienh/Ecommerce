'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import { delayForm } from '@/lib/utils'
import { requestApi } from '@/services'
import { ResourceDetail } from '@/services/resource-request-api'
import { AddRoleSchema, AddRoleType, RoleDetail } from '@/services/role-request-api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import ChoosePermissions, { ChangePermissionParams } from './choose-permissions'

export default function FormRole({ role, resources }: { role?: RoleDetail; resources: ResourceDetail[] }) {
  // 1. Define your form.
  const form = useForm<AddRoleType>({
    resolver: zodResolver(AddRoleSchema),
    defaultValues: {
      name: role?.name || '',
      description: role?.description || '',
      permissionIds: role?.permissions.map((p) => p.id) || []
    }
  })
  // 2. handle loading, store global state
  const router = useRouter()
  const { isLoading, startLoading, finallyLoading } = useLoading()
  const [permissionIds, setPermissionIds] = useState<number[]>(role?.permissions.map((p) => p.id) || [])
  // 3. Define a submit handler.
  async function onSubmit(values: AddRoleType) {
    startLoading()
    try {
      let res = undefined
      if (role) {
        res = await requestApi.role.update(role.id, values)
      } else res = await requestApi.role.add(values)
      await delayForm()
      toast.success(res.message)
      router.push('/dashboard/roles')
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      finallyLoading()
    }
  }
  const handleChangePermission = ({ group, permissionId, resource, checked }: ChangePermissionParams) => {
    if (permissionId) {
      if (checked) {
        setPermissionIds([...permissionIds, permissionId])
      } else {
        setPermissionIds(permissionIds.filter((id) => id !== permissionId))
      }
    }
    if (group) {
      if (checked) {
        setPermissionIds([...permissionIds, ...group.permissions.map((p) => p.id)])
      } else {
        setPermissionIds(permissionIds.filter((id) => !group.permissions.map((p) => p.id).includes(id)))
      }
    }
    if (resource) {
      if (checked) {
        setPermissionIds([...permissionIds, ...resource.groups.map((g) => g.permissions.map((p) => p.id)).flat()])
      } else {
        setPermissionIds(
          permissionIds.filter(
            (id) =>
              !resource.groups
                .map((g) => g.permissions.map((p) => p.id))
                .flat()
                .includes(id)
          )
        )
      }
    }
    form.setValue('permissionIds', permissionIds)
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
                <Input placeholder='Nhập tên role' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Nhập mô tả' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ChoosePermissions
          handleChangePermission={handleChangePermission}
          resources={resources}
          permissionIds={permissionIds}
        />
        <Button disabled={isLoading} type='submit' className='w-full'>
          {role ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </form>
    </Form>
  )
}

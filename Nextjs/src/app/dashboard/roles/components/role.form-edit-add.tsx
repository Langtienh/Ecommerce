'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useLoading from '@/hooks/use-loading'
import { serverRevalidatePathAndRedirect } from '@/lib/action'
import { handleErrorApi } from '@/lib/handle-request'
import { PermissionDetail } from '@/services/permission'
import { AddRoleSchema, AddRoleType, RolePermissions, roleRequest } from '@/services/role'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { PermissionGroup } from './choose-permission/permission-group'

export default function FormRole({
  role,
  permissions
}: {
  role?: RolePermissions
  permissions: PermissionDetail[]
}) {
  // 1. Define your form.
  const form = useForm<AddRoleType>({
    resolver: zodResolver(AddRoleSchema),
    defaultValues: {
      name: role?.name || '',
      description: role?.description || '',
      roleLevel: role?.roleLevel || 10,
      permissionIds: role?.permissions.map((p) => p.id) || []
    }
  })
  // 2. handle loading, store global state
  const { isLoading, startLoading, finallyLoading } = useLoading()
  const [permissionIds, setPermissionIds] = useState<number[]>(
    role?.permissions.map((p) => p.id) ?? []
  )
  // 3. Define a submit handler.
  async function onSubmit(values: AddRoleType) {
    startLoading()
    try {
      let res = undefined
      if (role) {
        res = await roleRequest.update(role.id, { ...values, permissionIds })
      } else res = await roleRequest.create({ ...values, permissionIds })
      toast.success(res.message)
      serverRevalidatePathAndRedirect('/dashboard/roles', 'sort=-updatedAt')
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      finallyLoading()
    }
  }
  const onCheckedChange = (addPermissionIds: number[], isChecked: boolean) => {
    console.log('addPermissionIds', addPermissionIds)
    if (isChecked) {
      setPermissionIds([
        ...permissionIds.filter((id) => !addPermissionIds.includes(id)),
        ...addPermissionIds
      ])
    } else {
      setPermissionIds(permissionIds.filter((id) => !addPermissionIds.includes(id)))
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
        <PermissionGroup
          onCheckedChange={onCheckedChange}
          permissionSelectedIds={permissionIds}
          permissions={permissions}
        />
        <Button disabled={isLoading} type='submit' className='w-full'>
          {role ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </form>
    </Form>
  )
}

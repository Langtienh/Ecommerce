'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import { delayForm } from '@/lib/utils'
import { AddRoleSchema, AddRoleType } from '@/services/author/author-schema'
import roleRequestApi from '@/services/author/role-request'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import ChoosePermissions, { ChangePermissionParams } from './choose-permissions'

export default function FormRole({ role, resources }: { role?: RoleDetail; resources: ResourceDetail[] }) {
  const [permissionIds, setPermissionIds] = useState<number[]>(role?.permissions.map((p) => p.id) || [])
  // 1. Define your form.
  const form = useForm<AddRoleType>({
    resolver: zodResolver(AddRoleSchema),
    defaultValues: {
      name: role?.name || '',
      description: role?.description || ''
    }
  })
  // 2. handle loading, store global state
  const router = useRouter()
  const { isLoading, startLoading, finallyLoading } = useLoading()
  // 3. Define a submit handler.
  async function onSubmit(values: AddRoleType) {
    startLoading()
    try {
      let res = undefined
      if (role) {
        res = await roleRequestApi.update(role.id, values, permissionIds)
      } else res = await roleRequestApi.add(values, permissionIds)
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
      if (checked) setPermissionIds((prev) => [...prev, permissionId])
      else setPermissionIds((prev) => prev.filter((id) => id !== permissionId))
    }
    if (group) {
      group.permissions.forEach((per) => {
        if (checked) {
          if (!permissionIds.includes(per.id)) setPermissionIds((prev) => [...prev, per.id])
        } else setPermissionIds((prev) => prev.filter((id) => id !== per.id))
      })
    }
    if (resource) {
      resource.groups.forEach((group) => {
        group.permissions.forEach((per) => {
          if (checked) {
            if (!permissionIds.includes(per.id)) setPermissionIds((prev) => [...prev, per.id])
          } else setPermissionIds((prev) => prev.filter((id) => id !== per.id))
        })
      })
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

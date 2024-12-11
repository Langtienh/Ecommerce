'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import envConfig from '@/config/envConfig'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import { Role } from '@/services/role'
import {
  AddUserSchema,
  AddUserType,
  USER_STATUS_VALUES,
  UserDetail,
  userRequest,
  UserStatus
} from '@/services/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function FormRole({ roles, user }: { roles: Role[]; user?: UserDetail }) {
  // 1. Define your form.
  const form = useForm<AddUserType>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      roleId: user?.roleId || 1,
      status: user?.status || UserStatus.VERIFY
    }
  })
  // 2. handle loading, store global state
  const router = useRouter()
  const { isLoading, startLoading, finallyLoading } = useLoading()
  // 3. Define a submit handler.
  async function onSubmit(values: AddUserType) {
    startLoading()
    try {
      let res = undefined
      if (user) {
        res = await userRequest.update(user.id, values)
      } else {
        if (!values.password && !user) {
          values.password = envConfig.ADMIN_PASSWORD
        }
        res = await userRequest.create(values)
      }
      toast.success(res.message)
      router.push('/dashboard/users')
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
                <Input placeholder='Nhập tên người dùng' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='email' placeholder='Nhập email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Nhập số điện thoại' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='password' placeholder='Nhập mật khẩu (có thể bỏ qua)' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-wrap justify-between items-center gap-y-8'>
          <FormField
            control={form.control}
            name='roleId'
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => field.onChange(+value)}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger className='w-[200px]'>
                      <SelectValue placeholder='Role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={`role-${role.id}`} value={role.id.toString()}>
                        {role.name}
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
            name='status'
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-[200px]'>
                      <SelectValue placeholder='Role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {USER_STATUS_VALUES.map((userStatus) => (
                      <SelectItem key={`userStatus-${userStatus}`} value={userStatus}>
                        {userStatus}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isLoading} type='submit' className='w-full'>
          {user ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </form>
    </Form>
  )
}

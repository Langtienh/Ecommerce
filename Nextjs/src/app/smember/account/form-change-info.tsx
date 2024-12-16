'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useAccount from '@/hooks/use-account'
import useLoading from '@/hooks/use-loading'
import { formatTimestamp } from '@/lib/format'
import { handleErrorApi } from '@/lib/handle-request'
import { meRequest, UpdateMeBodyType, UpdateMeSchema } from '@/services/me'
import { User } from '@/services/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function FormChangeInfo({ user }: { user: User }) {
  // 1. Define your form.
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone
    }
  })
  const setUser = useAccount((state) => state.setUser)
  const router = useRouter()
  const { finallyLoading, isLoading, startLoading } = useLoading()
  // 2. Define a submit handler.
  async function onSubmit(values: UpdateMeBodyType) {
    startLoading()
    try {
      const res = await meRequest.update(values)
      setUser(res.data)
      toast.success(res.message)
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      finallyLoading()
      router.refresh()
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pt-5'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Nhập tên của bạn' {...field} />
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
        <Input defaultValue={`Email: ${user.email}`} disabled />
        <Input
          defaultValue={`Ngày tham gia smember: ${formatTimestamp(user.createdAt)}`}
          disabled
        />
        <Button
          className='w-full'
          size='lg'
          variant='destructive'
          disabled={isLoading}
          type='submit'
        >
          Cập nhật thông tin
        </Button>
      </form>
    </Form>
  )
}

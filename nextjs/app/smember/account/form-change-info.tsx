'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useLoading from '@/hooks/use-loading'
import { formatTimestamp } from '@/lib/format'
import { handleErrorApi } from '@/lib/handle-request'
import { UpdateMeBodyType, UpdateMeSchema } from '@/services/authen/schema'
import meRequestApi from '@/services/me/me-request'
import { zodResolver } from '@hookform/resolvers/zod'
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

  const { finallyLoading, isLoading, startLoading } = useLoading()
  // 2. Define a submit handler.
  async function onSubmit(values: UpdateMeBodyType) {
    startLoading()
    try {
      const res = await meRequestApi.updateMe(values)
      toast.success(res.message)
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      finallyLoading()
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
        <Input defaultValue={`Ngày tham gia smember: ${formatTimestamp(user.createdAt)}`} disabled />
        <Button className='w-full' size='lg' variant='destructive' disabled={isLoading} type='submit'>
          Cập nhật thông tin
        </Button>
      </form>
    </Form>
  )
}

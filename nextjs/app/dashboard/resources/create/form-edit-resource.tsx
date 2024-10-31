'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import { delayForm } from '@/lib/utils'
import { requestApi } from '@/services'
import { AddResourceSchema, AddResourceType, Resource } from '@/services/resource-request-api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
export default function FormEditResource({ resource }: { resource?: Resource }) {
  // 1. Define your form.
  const form = useForm<AddResourceType>({
    resolver: zodResolver(AddResourceSchema),
    defaultValues: {
      name: resource?.name || '',
      description: resource?.description || ''
    }
  })
  // 2. handle loading, store global state
  const router = useRouter()
  const { isLoading, startLoading, finallyLoading } = useLoading()
  // 3. Define a submit handler.
  async function onSubmit(values: AddResourceType) {
    startLoading()
    try {
      let res = undefined
      if (resource) {
        res = await requestApi.resource.update(resource.id, values)
      } else res = await requestApi.resource.add(values)
      await delayForm()
      toast.success(res.message)
      router.push('/dashboard/resources')
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
                <Input placeholder='Nhập tên resource' {...field} />
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
        <Button disabled={isLoading} type='submit' className='w-full'>
          {resource ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </form>
    </Form>
  )
}

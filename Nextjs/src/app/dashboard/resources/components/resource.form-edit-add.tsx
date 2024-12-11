'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useLoading from '@/hooks/use-loading'
import { serverRevalidatePath, serverRevalidatePathAndRedirect } from '@/lib/action'
import { handleErrorApi } from '@/lib/handle-request'
import { delayAction } from '@/lib/utils'
import { AddResourceSchema, AddResourceType, Resource, resourceRequest } from '@/services/resource'
import { zodResolver } from '@hookform/resolvers/zod'
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
  const { isLoading, startLoading, finallyLoading } = useLoading()
  // 3. Define a submit handler.
  async function onSubmit(values: AddResourceType) {
    startLoading()
    try {
      let res = undefined
      if (resource) {
        res = await resourceRequest.update(resource.id, values)
        await serverRevalidatePath(`/dashboard/resources/${res.data.id}/edit`)
      } else res = await resourceRequest.create(values)
      await delayAction()
      toast.success(res.message)
      await serverRevalidatePathAndRedirect('/dashboard/resources', 'sort=-updatedAt')
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

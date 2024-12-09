import { Button } from '@/components/ui/button'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import { userRequest } from '@/services/user'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function DeleteManyButton({
  ids,
  handleMutateSelected
}: {
  ids: number[]
  handleMutateSelected: () => void
}) {
  const { finallyLoading, startLoading } = useLoading()
  const router = useRouter()
  const handleDeleteMany = async () => {
    startLoading()
    try {
      const res = await userRequest.deleteMany(ids)
      toast.success(res.message)
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      handleMutateSelected()
      router.refresh()
      finallyLoading()
    }
  }
  return (
    <Button onClick={handleDeleteMany} variant='destructive' disabled={ids.length === 0}>
      Xóa
    </Button>
  )
}

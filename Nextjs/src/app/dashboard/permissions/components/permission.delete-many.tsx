import { Button } from '@/components/ui/button'
import useLoading from '@/hooks/use-loading'
import { serverRevalidatePathAndRedirect } from '@/lib/action'
import { handleErrorApi } from '@/lib/handle-request'
import { permissionRequest } from '@/services/permission'
import { toast } from 'sonner'

export default function DeleteManyButton({
  ids,
  handleMutateSelected
}: {
  ids: number[]
  handleMutateSelected: () => void
}) {
  const { finallyLoading, startLoading } = useLoading()
  const handleDeleteMany = async () => {
    startLoading()
    try {
      const res = await permissionRequest.deleteMany(ids)
      toast.success(res.message)
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      handleMutateSelected()
      await serverRevalidatePathAndRedirect('/dashboard/permisions', 'sort=-updatedAt')
      finallyLoading()
    }
  }
  return (
    <Button onClick={handleDeleteMany} variant='destructive' disabled={ids.length === 0}>
      Xóa
    </Button>
  )
}

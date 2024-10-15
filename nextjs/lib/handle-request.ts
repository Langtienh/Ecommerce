import { UseFormSetError } from 'react-hook-form'
import { toast } from 'sonner'
import { EntityError } from './http'

export const handleErrorApi = ({
  error,
  setError
}: {
  error: any
  message?: string
  setError?: UseFormSetError<any>
}) => {
  if (error instanceof EntityError && setError) {
    Object.keys(error.constraints).forEach((key) => {
      setError(key, {
        type: 'validate',
        message: error.constraints[key]
      })
    })
  } else {
    toast.error(error?.message || 'Lỗi không xác định')
  }
}

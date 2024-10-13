import { toast } from 'sonner'

export default async function handleRequest<T>(
  requestFn: () => Promise<T>,
  successMessage: string,
  errorMessage: string = 'Server error'
): Promise<T | null> {
  try {
    const response = await requestFn()
    toast.success(successMessage)
    return response
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error(errorMessage)
    }
    return null
  }
}

'use client'
import { usePathname } from 'next/navigation'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

// Định nghĩa kiểu dữ liệu cho context
interface LoadingContextType {
  isLoading: boolean
  startLoading: () => void
  finallyLoading: () => void
}

const defaultLoadingContext: LoadingContextType = {
  isLoading: false,
  startLoading: () => {},
  finallyLoading: () => {}
}

// Tạo context với giá trị mặc định
const LoadingContext = createContext<LoadingContextType>(defaultLoadingContext)

// Tạo provider
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = () => setIsLoading(true)
  const finallyLoading = () => setIsLoading(false)

  const path = usePathname()

  useEffect(() => {
    finallyLoading()
  }, [path])

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, finallyLoading }}>{children}</LoadingContext.Provider>
  )
}

// Hook để sử dụng context
export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

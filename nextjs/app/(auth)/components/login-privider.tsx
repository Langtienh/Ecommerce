'use client'
import { Button } from '@/components/ui/button'
import { handleErrorApi } from '@/lib/handle-request'
import http from '@/lib/http'
import { imageSrc } from '@/lib/utils'
import { serverSetCookies } from '@/services/cookies/auth-cookie'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const providers = [
  {
    label: 'google',
    image: 'logo/google'
  },
  {
    label: 'github',
    image: 'logo/github'
  }
]

export default function LoginProvider() {
  return (
    <Suspense>
      <Wrapper />
    </Suspense>
  )
}

const Wrapper = () => {
  const searchParam = useSearchParams()
  const redirectUri = searchParam.get('redirectUri') || '/home'
  const router = useRouter()
  const handleClick = async (provider: string) => {
    try {
      const res = await http.get<{ redirectUri: string }>(`/oauth/${provider}`)
      const url: string = res.data.redirectUri
      await serverSetCookies('redirectUri', redirectUri)
      router.push(url)
    } catch (error) {
      handleErrorApi({ error })
    }
  }
  return (
    <div className='h-14 flex items-center justify-between gap-10'>
      {providers.map((provider) => (
        <Button
          onClick={() => handleClick(provider.label)}
          key={provider.label}
          className='text-base gap-3'
          variant='ghost'
        >
          <Image
            width={24}
            height={24}
            alt={provider.label}
            src={imageSrc(provider.image)}
            className='size-6 rounded-full text-base'
          />
          <span className='capitalize'>{provider.label}</span>
        </Button>
      ))}
    </div>
  )
}

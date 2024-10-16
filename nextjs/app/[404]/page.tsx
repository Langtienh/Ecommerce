import Image from 'next/image'

export default function Page() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Image width={512} height={512} alt='404' src='/images/404.png' />
    </div>
  )
}

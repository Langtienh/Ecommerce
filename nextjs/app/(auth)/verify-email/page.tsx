import { getAccessTokenPayload } from '@/services/cookies/authen'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import VerifyEmailForm from '../components/verify-email-form'

export default async function Page() {
  const accessTokenPayload = await getAccessTokenPayload()
  if (!accessTokenPayload) redirect('/')
  const verifyEmailToken = await cookies().get('verifyEmailToken')?.value
  if (accessTokenPayload.status !== 'unverify') redirect('/')
  return <VerifyEmailForm email={accessTokenPayload.email} verifyEmailToken={verifyEmailToken} />
}

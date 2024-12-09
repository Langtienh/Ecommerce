import { ModeToggle } from '@/components/theme/mode-toggle'
import { Card } from '@/components/ui/card'
import { DashboardBreadcrumb } from './breadcrumb'
import LogoutButton from './logout-button'
import UserName from './user-name'

export default function DashBoardHeader() {
  return (
    <Card className='h-12 fixed top-0 left-14 right-0 px-3 flex items-center justify-between rounded-none text-sm'>
      <div>
        <DashboardBreadcrumb />
      </div>
      <div className='flex items-center space-x-3 h-full'>
        <UserName />
        <ModeToggle />
        <LogoutButton />
      </div>
    </Card>
  )
}

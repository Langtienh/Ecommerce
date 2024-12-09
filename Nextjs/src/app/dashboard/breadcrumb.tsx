'use client'
import { SlashIcon } from '@radix-ui/react-icons'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

export function DashboardBreadcrumb() {
  const path = usePathname()
  const paths = path.split('/').filter((p) => p !== '')
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join('/')}`
          return (
            <Fragment key={path}>
              {index !== 0 && (
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
              )}

              <BreadcrumbItem>
                {index === paths.length - 1 ? (
                  <BreadcrumbPage className='capitalize'>{path}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink className='capitalize' href={href}>
                    {path}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

import { PlusCircledIcon } from '@radix-ui/react-icons'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, Suspense } from 'react'

interface ColumnFilterProps<TData, TValue> {
  defaultSelected: string[]
  title: string
  fieldName: string
  options: {
    value: string
    item: ReactNode
  }[]
}

export function FieldFilter<TData, TValue>(props: ColumnFilterProps<TData, TValue>) {
  return (
    <Suspense>
      <Wrapper {...props} />
    </Suspense>
  )
}

function Wrapper<TData, TValue>({ title, fieldName, options, defaultSelected }: ColumnFilterProps<TData, TValue>) {
  const key = `${fieldName}[in]`
  const searchParams = useSearchParams()
  const _selectedValues = searchParams.getAll(key).length > 0 ? searchParams.getAll(key) : defaultSelected
  const { replace } = useRouter()
  const patchName = usePathname()
  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams)
    params.delete(key)
    replace(`${patchName}?${params}`)
  }
  const handleSelect = (value: string, isSelect: boolean) => {
    const newSelectedValues = [..._selectedValues]
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (isSelect) {
      newSelectedValues.push(value)
    } else {
      const index = newSelectedValues.indexOf(value)
      newSelectedValues.splice(index, 1)
    }
    if (newSelectedValues.length === defaultSelected.length) params.delete(key)
    else {
      params.delete(key) // Xóa các giá trị hiện có cho khóa
      newSelectedValues.forEach((val) => params.append(key, val))
    }
    replace(`${patchName}?${params}`)
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <PlusCircledIcon className='mr-2 h-4 w-4' />
          {title}
          {_selectedValues.length > 0 && _selectedValues.length !== defaultSelected.length && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge variant='secondary' className='rounded-sm px-1 font-normal lg:hidden'>
                {_selectedValues.length}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {_selectedValues.length > 2 ? (
                  <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
                    {_selectedValues.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => _selectedValues.includes(option.value))
                    .map((option) => (
                      <Badge variant='secondary' key={option.value} className='rounded-sm px-1 font-normal'>
                        {option.item}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = _selectedValues.includes(option.value)
                return (
                  <CommandItem value={option.value} className='flex gap-3' key={option.value}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleSelect(option.value, !!checked)}
                    />
                    {option.item}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {_selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={handleClearFilter} className='justify-center text-center'>
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

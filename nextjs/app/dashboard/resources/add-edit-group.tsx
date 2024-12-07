'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import useLoading from '@/hooks/use-loading'
import { handleErrorApi } from '@/lib/handle-request'
import { requestApi } from '@/services'
import { Group } from '@/services/group-request-api'
import { Resource } from '@/services/resource-request-api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { toast } from 'sonner'

export default function Groups({ groups, resource }: { groups: Group[]; resource: Resource }) {
  const { startLoading, finallyLoading } = useLoading()
  const [newGroup, setNewGroup] = useState('')
  const [groupIdEdit, setGroupIdEdit] = useState<number | null>(null)
  const router = useRouter()
  const handleAddEditGroup = async () => {
    startLoading()
    try {
      if (groupIdEdit) {
        const res = await requestApi.group.update(groupIdEdit, { name: newGroup, resourceId: resource.id })
        toast.success(res.message)
      } else {
        const res = await requestApi.group.add({ name: newGroup, resourceId: resource.id })
        toast.success(res.message)
      }
      router.refresh()
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setNewGroup('')
      setGroupIdEdit(null)
      finallyLoading()
    }
  }
  const handleDeleteGroup = async (id: number) => {
    startLoading()
    try {
      await requestApi.group.delete(id)
      toast.success('Delete group success')
      router.refresh()
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      finallyLoading()
    }
  }
  const handleToEditGroup = (group: Group) => {
    setNewGroup(group.name)
    setGroupIdEdit(group.id)
  }
  return (
    <>
      <h5>Groups list</h5>
      <Separator />
      {groups.length === 0 ? (
        <p className='py-4'>{`${resource.name} resource chưa có group nào`}</p>
      ) : (
        <ul className='space-y-1 py-2'>
          {groups.map((group) => (
            <li className='flex items-center justify-between' key={group.id}>
              <p>{group.name}</p>
              <div className='flex gap-3'>
                <Button onClick={() => handleToEditGroup(group)} variant='ghost' size='sm'>
                  <FaEdit size={18} className='text-yellow-600' />
                </Button>
                <Button onClick={() => handleDeleteGroup(group.id)} variant='ghost' size='sm'>
                  <MdDelete size={18} className='text-red-600' />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Separator />
      <div className='flex gap-3 py-2'>
        <Input
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          className='w-full flex-1'
          placeholder={groupIdEdit ? 'Edit group' : 'Add new group'}
        />
        <Button disabled={newGroup.length === 0} onClick={handleAddEditGroup}>
          {groupIdEdit ? 'Update' : 'Add'}
        </Button>
        {groupIdEdit && (
          <Button
            onClick={() => {
              setGroupIdEdit(null)
              setNewGroup('')
            }}
            variant='secondary'
          >
            Cancel
          </Button>
        )}
      </div>
    </>
  )
}

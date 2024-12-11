import {  PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FolderIcon } from 'lucide-react'
import React from 'react'
import FolderDuotone from '@/components/icons/folder-duotone'
import { ArrowRightIcon } from 'lucide-react'
import Folder from './folder'
import { cn } from '@/lib/utils'
type Props = {
    workspaceId: string
}

const Folders = ({workspaceId}: Props) => {
  return (
    // Get folders
    <div className='flex flex-col gap-4 '>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <FolderDuotone/>
                <h2 className='text-xl font-bold text-[#BDBDBD]'>Folders</h2>
            </div>              
            <div className='flex items-center gap-2'>
                <p className='text-[#BDBDBD]'>
                    See all
                </p>
                <ArrowRightIcon  color=" #707070"/>
            </div>
        </div>

        <section className={cn('flex items-center gap-4 overflow-x-auto w-full')}>
            <Folder name="Folder 1" id="1" optimistic={false} />
        </section>
    </div>
  )
}

export default Folders
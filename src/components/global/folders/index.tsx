'use client'
import {  PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FolderIcon } from 'lucide-react'
import React from 'react'
import FolderDuotone from '@/components/icons/folder-duotone'
import { ArrowRightIcon } from 'lucide-react'
import Folder from './folder'
import { cn } from '@/lib/utils'
import { useQueryData } from '@/hooks/useQueryData'
import { getWorkspaceFolders } from '@/actions/workspace'
import { useMutationDataState } from '@/hooks/useMutationData'
import { useDispatch } from 'react-redux'
import { FOLDERS } from '@/redux/slices/folders'
type Props = {
    workspaceId: string
}

export type FolderProps = {
    status: number,
    data: ({
        _count:{
            videos: number
        }
    } & {
        id: string,
        name: string,
        createdAt: Date,
        workSpaceId: string | null
    })[] 
}

const Folders = ({workspaceId}: Props) => {
    const {data, isFetched} = useQueryData(['workspace-folders'], 
        () => getWorkspaceFolders(workspaceId), 
    )

    const {latestVariables} = useMutationDataState(['create-folder'])
    const dispatch = useDispatch()

    const {status, data: folders} = data as FolderProps
    


    if(isFetched && folders){
        dispatch(FOLDERS({folders: folders}))
    }
    
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

        <section className={cn(status !== 200 && 'justify-center', 'flex items-center gap-4 overflow-x-auto w-full')}>
            {/* <Folder name="Folder 1" id="1" optimistic={false} /> */}
            {status !== 200 ?(
                <p className='text-neutral-300'>No Folders in workspace</p>
            ):<>
                {latestVariables && latestVariables.status === 'pending' && (
             
                    <>
                    <Folder 
                    name = {latestVariables.variables.name}
                    id={latestVariables.variables.id}
                    optimistic
                    />
        
                    </>

           
                   
                )}
                {folders.map((folder) =>(
                    <>
                    <Folder
                        name = {folder.name}
                        count = {folder._count.videos}
                        id = {folder.id}
                        key={folder.id}
                        />
             
                    </>
                ))}
            </>
            }
        </section>
    </div>
  )
}

export default Folders
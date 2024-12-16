import { Label } from "@/components/ui/label"
import { SeparatorHorizontal } from "lucide-react"
import React from 'react'
import { useMoveVideos } from '@/hooks/useFolder'

type Props = {
    videoId: string
    currentFolder?: string
    currentWorkSpace?: string
    currentFolderName?: string
}

const ChangeVideoLocation = ({
    videoId,
    currentFolder,
    currentWorkSpace,
    currentFolderName
}: Props) => {
    const {
        folders,
        workspaces,
        isFetching,
        isFolders,
        onFormSubmit,
        register,
        errors,
        isPending
    
    } = useMoveVideos(videoId, currentWorkSpace!)
    
    const folder = folders.find((f)=> f.id === currentFolder)
    const workspace = workspaces.find((f)=> f.id === currentWorkSpace)
  return (
    <form className='flex flex-col gap-y-5'>
        <div className='border-[1px] rounded-xl p-5'>
            <h2 className='text-xs mb-5 text-[#a4a4a4]'>Current</h2>
            { workspace && (
                <p className='text-[#a4a4a4]'> Workspace</p>
            )}
            <p className='text-[#a4a4a4] text-sm'> Random Folder</p>
        </div>
        <SeparatorHorizontal/>
        <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
            <h2 className="text-xs text-[#a4a4a4] ">
                To
            </h2>
            <Label className="flex-col gap-y-2 flex" > 
                <p className="text-xs"> Workspace </p>
                <select className="rounded-xl text-base bg-transparent">
                    <option
                    className="text-[#a4a4a4]"
                    value={'random-folder'}>Random Folder</option>

                </select>
            </Label>
        </div>
    </form>
  )
}

export default ChangeVideoLocation
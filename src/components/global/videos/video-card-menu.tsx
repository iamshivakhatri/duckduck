import React from 'react'
import Modal from '../modal'
import { Move } from 'lucide-react'
import ChangeVideoLocation from '@/components/forms/change-video-location'
import { current } from '@reduxjs/toolkit'

type Props = {
    videoId: string
    currentWorkSpace: string
    currentFolder?: string
    currentFolderName?: string
}

const CardMenu = ({
    videoId,
    currentWorkSpace,
    currentFolder,
    currentFolderName
}: Props) => {
    console.log("currentFolder", currentFolder)
    console.log("currentFolderName", currentFolderName)
    console.log("currentWorkSpace", currentWorkSpace)
    console.log("videoId", videoId)


  return (
    <Modal 
          className='flex items-center cursor-pointer gap-x-2'
          title='Move to Folder'
          description='Select a folder to move this video to'
          trigger={
          <Move
              fill='#4f4f4f'
              color='#707070'
              className='text-[#4f4f4f]'
              size={20} />} 
    >
        <ChangeVideoLocation
            videoId={videoId}
            currentFolder={currentFolder}
            currentWorkSpace={currentWorkSpace}
            currentFolderName={currentFolderName}
        />


    </Modal>

  )
}

export default CardMenu
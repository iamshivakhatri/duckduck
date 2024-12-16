import React from 'react'
import Modal from '../modal'
import { Move } from 'lucide-react'
import ChangeVideoLocation from '@/components/forms/change-video-location'

type Props = {
    videoId: string
    workspaceId: string
    currentFolder?: string
    currentFolderName?: string
}

const CardMenu = ({
    videoId,
    workspaceId,
    currentFolder,
    currentFolderName
}: Props) => {
  return (
    <Modal 
          className='flex items-center cursor-pointer gap-x-2'
          title='Move to Folder'
          description='Select a folder to move this video to'
          trigger={<Move
              color='#707070'
              size={20} />} 
    >
        <ChangeVideoLocation
            videoId={videoId}
            currentFolder={currentFolder}
            currentWorkSpace={workspaceId}
            currentFolderName={currentFolderName}
        />


    </Modal>

  )
}

export default CardMenu
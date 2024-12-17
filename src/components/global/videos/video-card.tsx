import React from 'react'
import Loader from '../loader'
import CardMenu from './video-card-menu'
import ChangeVideoLocation from '@/components/forms/change-video-location'
import CopyLink from './copy-link'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dot, Share2 } from 'lucide-react'

type Props = {
    User: {
      firstname: string | null
      lastname: string | null
      image: string | null
    } | null
    id: string
    Folder: {
      id: string
      name: string
    } | null
    createdAt: Date
    title: string | null
    source: string
    processing: boolean
    workspaceId: string
  }
  

const VideoCard = (props: Props) => {
    //TODO: ADD date later
    const daysAgo = Math.floor(
        (new Date().getTime() - props.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    )
  return (
  <Loader
  className='bg-[#171717] flex justify-center items-center border-[1px] border-[#252525] rounded-xl' 
  state={props.processing} >
    <div className='group overflow-hiddden cursor-pointer bg-[#171717] relative border-[1px] 
    border-[#252525] flex flex-col rounded-xl '>
        <div className='absolute top-3 right-3 z-50 flex flex-col gap-y-3 hidden group-hover:flex'>
            <CardMenu 
            videoId={props.id}
             currentWorkSpace={props.workspaceId}
             currentFolder={props.Folder?.id} 
             currentFolderName={props.Folder?.name}/>

             <CopyLink
              className='p-0 h-5 bg-hover:bg-transparent bg-[#252525]'
              videoId={props.id}
              />
        </div>
        <Link
        href={`/dashboard/${props.workspaceId}/video/${props.id}`}
        className='hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full '>
             
         <video 
         controls ={false}
         preload='metadata'
         className='w-full aspect-auto opacity-50 z-20'
         >

         </video>

         <div className='px-5 py-3 flex flex-col gap-y-2 z-20 '>
            <h2 className='text-sm font-semibold text-[#BDBDBD]'>{props.title}</h2>
            <div className='flex items-center gap-x-2 mt-2 '>
                <Avatar className='w-8 h-8'>
                    <AvatarImage src={props.User?.image as string} />
                    <AvatarFallback>
                        {props.User?.firstname?.charAt(0)}
                    </AvatarFallback>

                </Avatar>
                <div>
                    <p className='capitalize text-xs text-[#BDBDBD]'> {props.User?.firstname} {props.User?.lastname}</p>
                    <p className=' text-[#9D9D9D]  text-xs flex items-center'> 
                       <Dot/> {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
                    </p>
                </div>
            </div>
            <div className='mt-2'>
               <span className='flex gap-x-1 items-center'>
                  <Share2
                  fill='#9D9D9D'
                  className='text-[#9D9D9D]'
                  size={12}
                  />
                  <p className='text-xs text-[#9D9D9D] capitalize'>
                    {props.User?.firstname}s Workplace
                  </p>
                </span> 
            </div>
         </div>

        </Link>

      
    </div>

  </Loader>
  )
}

export default VideoCard
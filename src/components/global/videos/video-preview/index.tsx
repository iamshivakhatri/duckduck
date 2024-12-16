'use client';
import { useQueryData } from '@/hooks/useQueryData'
import { getPreviewVideo } from '@/actions/workspace'
import React from 'react'
import { useRouter } from 'next/navigation';
import CopyLink from '../copy-link';
import RichLink from '../rich-link';
import { truncateString } from '@/lib/utils';

type Props = {
    videoId: string
}

export type VideoProps = {
  status: number
  data: {
    User: {
      firstname: string | null
      lastname: string | null
      image: string | null
      clerkId: string
      trial: boolean
      subscription: {
        plan: 'PRO' | 'FREE'
      } | null
    } | null
    title: string | null
    description: string | null
    source: string
    views: number
    createdAt: Date
    processing: boolean
    summary: string
  }
  author: boolean
}


const VideoPreview = ({videoId}: Props) => {
  // TODO: Setup notify first video

  const router = useRouter()

  const {data} = useQueryData(
    ['preview-video'],
     ()=>getPreviewVideo(videoId)
    )

    const {data: video, status, author} = data as VideoProps

    if (status !== 200 && status !== 201) { 
        router.push('/')
    }

    const daysAgo = Math.floor(
      (new Date().getTime() - video.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    )


  return (
    <div className='grid grid-cols-1 xl:grid-cols-3 p-10 lg:px-20 lg:py-10 overflow-y-auto gap-5'>
      <div className='flex flex-col lg:col-span-2 gap-y-10'>
        <div>
            <div className='flex gap-x-5 items-start justify-between'>
              <h2 className='text-white text-4xl font-bold'>{video.title}</h2>
              {/* {author? (
                <EditVideo
                videoId={videoId}
                title={video.title as string}
                description={video.description as string}
                />
              ):''} */}
            </div>
            <span className='flex gap-x-3 mt-2'>
              <p className='text-[#9D9D9D] capitalize'>
                {video.User?.firstname} {video.User?.lastname}
              </p>
              <p className='text-[#9D9D9D]'>
                {daysAgo === 0 ? 'Today' : `${daysAgo} days ago`}
              </p>
            </span>
        </div>
        <video
        controls={true}
        preload='metadata'
        className='w-full aspect-auto opacity-50 rounded-xl'
        >
           <source
            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video.source}#1`}
          />
        </video>
        <div className='flex flex-col text-2xl gap-y-4'>
          <div className='flex gap-x-5 items-center justify-between'>
                <p className='text-[#BDBDBD] text-semibold'> Description </p>
                {/* {author ? (
                  <EditVideo
                    videoId={videoId}
                    title={video.title as string}
                    description={video.description as string}
                  />
                ) : (
                  <></>
                )} */}
          </div>
          <p className='text-[#9D9D9D] text-lg text-medium'>
                {video.description}
          </p>
        </div>
      </div>
      <div className='lg;col-span-1 flex flex-col gap-y-16'>
        <div className='flex jsutify-end gap-x-3'>
            <CopyLink variant="outline" className='rounded-full bg-transparent px-10' videoId={videoId} />
            <RichLink
             description={truncateString(video.description as string, 150)}
             id={videoId}
             source={video.source}
             title={video.title as string}
            />
            
        </div>           
      </div>
    </div>
  )
}

export default VideoPreview
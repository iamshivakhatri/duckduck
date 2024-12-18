'use client';
import { useQueryData } from '@/hooks/useQueryData'
import { getPreviewVideo, sendEmailForFirstView } from '@/actions/workspace'
import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation';
import CopyLink from '../copy-link';
import RichLink from '../rich-link';
import { truncateString } from '@/lib/utils';
import { Download } from 'lucide-react';
import TabMenu from '@/components/global/tabs/index'
import AiTools from '@/components/global/ai-tools/index';
import VideoTranscript from '@/components/global/video-transcript/index';
import Activities from '@/components/global/activities/index';

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

    const notifyFirstView = async () => await sendEmailForFirstView(videoId)


    const {data: video, status, author} = data as VideoProps

    if (status !== 200 && status !== 201) { 
        router.push('/')
    }

    const daysAgo = Math.floor(
      (new Date().getTime() - video.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    )


    useEffect(() => {
      if (video.views === 0) {
        notifyFirstView()
      }
      return () => {
        notifyFirstView()
      }
    }, [])


  return (
    <div className='grid grid-cols-1 xl:grid-cols-3  lg:px-20 lg:py-10 overflow-y-auto gap-5'>
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
        <div className='flex jsutify-end gap-x-3 items-center'>
            <CopyLink variant="outline" className='rounded-full bg-transparent px-10' videoId={videoId} />
            <RichLink
             description={truncateString(video.description as string, 150)}
             id={videoId}
             source={video.source}
             title={video.title as string}
            />
            <Download className='text-[#5d5b5b] hover:text-[#a7a7a7] cursor-pointer'/>
        </div>  
        <div>
       
          <TabMenu 
            defaultValue='Ai Tools' 
            triggers={['Ai Tools', 'Transcript', 'Activity']} 
          >
            <AiTools
              videoId={videoId}
              trial={video.User?.trial!}
              plan={video.User?.subscription?.plan!}
            />

            <VideoTranscript transcript={video.summary!} />

            <Activities
              author={video.User?.firstname as string}
              videoId={videoId}
            />

          </TabMenu>
        </div>         
      </div>
    </div>
  )
}

export default VideoPreview
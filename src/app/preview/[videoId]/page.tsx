import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import { getPreviewVideo } from '@/actions/workspace'
import VideoPreview from '@/components/global/videos/video-preview'

type Props = {
    params:{
        videoId: string
    }
}

const page = async ({params:{videoId}}: Props) => {
    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey: ['preview-video'],
        queryFn: ()=>getPreviewVideo(videoId)
    })
  return (
    <HydrationBoundary state={dehydrate(query)}>
        <div className='px-10'>
            <VideoPreview videoId={videoId}/>
        </div>
    </HydrationBoundary>
  )
}

export default page
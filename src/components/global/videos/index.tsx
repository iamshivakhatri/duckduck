"use client";

import { getAllUserVideos } from '@/actions/workspace'
import VideoRecorderDuotone from '@/components/icons/video-recorder-duotone';
import { useQueryData } from '@/hooks/useQueryData'
import { VideoProps } from '@/types/index.type'
import { cn } from '@/lib/utils'
import VideoCard from './video-card';
import React from 'react'


type Props = {
    folderId: string
    videosKey: string
    workspaceId: string
}

const videoMockData = {
    User: {
        firstname: "John",
        lastname: "Doe",
        image: "https://example.com/profile.jpg",
    },
    id: "video-123",
    processing: false,
    Folder: {
        id: "folder-456",
        name: "Travel Videos",
    },
    createdAt: new Date("2024-12-14T10:00:00Z"),
    title: "Exploring the Alps",
    source: "https://example.com/video.mp4",
};


const Videos = ({folderId, videosKey, workspaceId}: Props) => {
    const {data:videoData} = useQueryData(
        [videosKey],
        ()=>getAllUserVideos(folderId)
    )

    const {status:videosStatus, data:videos} = videoData as VideoProps

    console.log("videos", videos)
  return (
    <div className='flex flex-col gap-4 mt-4'>
        <div className='flex items-venter justify-between'>
            <div className='flex items-center gap-4'>
                <VideoRecorderDuotone/>
                <h2 className='text-[#BdBdBd] text-xl'>
                    Videos
                </h2>
            </div>
        </div>
        <section className={cn(videosStatus !== 200 ? 'p-5' : 
            'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' )}>

                {videosStatus === 200 ? 
                videos.map((video) =>(
                     <VideoCard key={video.id} workspaceId={workspaceId} {...video} />
                    
                    ))
                : <p className='text-[#BDBDBD] text-center'>No videos found</p>
                }


        </section>
    </div>
  )
}

export default Videos
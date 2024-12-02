import { onAuthenticatedUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import { getAllUserVideos, getNotifications, getWorkspaceFolders, getWorkspaces, verifyAccessToWorkspace } from '@/actions/workspace'
import React from 'react'
import { QueryClient, QueryClientProvider, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import Sidebar from '@/components/sidebar'


type Props = {
    params: {
        workspaceId: string
    },
    children: React.ReactNode
}

const layout = async ({ params:{workspaceId}, children }: Props) => {
    const auth = await onAuthenticatedUser()

    if(!auth.user?.workspace) redirect('/sign-in')
    if(!auth.user.workspace.length) redirect('/sign-in')
    const hasAcess = await verifyAccessToWorkspace(workspaceId)

    if(hasAcess.status !==200){
        redirect(`/dashboard/${auth.user?.workspace[0].id}`)
    }
    if(!hasAcess.data?.workspace) return null

    const query = new QueryClient()
    await query.prefetchQuery({
        queryKey: ["workspace-folders"],
        queryFn: () => getWorkspaceFolders(workspaceId),
    })

    await query.prefetchQuery({
        queryKey:["user-videos"],
        queryFn: ()=> getAllUserVideos(workspaceId),
    })
    await query.prefetchQuery({
        queryKey:["user-workspaces"],
        queryFn: ()=> getWorkspaces(),
    })

    await query.prefetchQuery({
        queryKey:["user-notifications"],
        queryFn: ()=> getNotifications(),
    })

  return (
    <HydrationBoundary state={dehydrate(query)}>
        <div className='flex h-screen w-screen'>
            <Sidebar activeWorkspaceId={workspaceId}/>
            {children}

        </div>
    </HydrationBoundary>
  )
}

export default layout
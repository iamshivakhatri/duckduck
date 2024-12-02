'use client'
import React from 'react'
import Image from 'next/image'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from '@/components/ui/select'
import { usePathname, useRouter } from 'next/navigation'
import { useQueryData } from '@/hooks/useQueryData'
import { getNotifications, getWorkspaces } from '@/actions/workspace'
import { NotificationProps, WorkspaceProps } from '@/types/index.type'
import Modal from '@/components/global/modal'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Link, PlusCircle, PlusIcon } from 'lucide-react'
import Search from '../global/search'
import { MENU_ITEMS } from '@/constant'
import SidebarItem from './sidebar-items'
import { Separator } from '../ui/separator'

type Props = {
    activeWorkspaceId: string
}

const Sidebar = ({activeWorkspaceId}: Props) => {
    const router = useRouter()
    const pathName = usePathname();
    const onChangeActiveWorkspace = (value: string) => {
        router.push(`/dashboard/${value}`)
    }
    const {data, isFetched} = useQueryData(["user-workspaces"], getWorkspaces)

    
    
    const menuItems = MENU_ITEMS(activeWorkspaceId);
     
    const {data: workspace} = data as WorkspaceProps

    const {data:notifications} = useQueryData(["user-notifications"], getNotifications)
    const {data:count} = notifications as NotificationProps

    console.log("This is called the workspace", workspace)

  return (
    <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden'>
        <div className='bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0' >
            <Image src={"/opal-logo.svg"} alt='logo' width={30} height={30} />
            <p className='text-2xl'>DuckDuck</p>
        </div>
        <Select
            defaultValue={activeWorkspaceId}
            onValueChange={onChangeActiveWorkspace}
        >
            <SelectTrigger className='mt-16 text-neutral-400 bg-transparent'>
                <SelectValue placeholder='Select a workspace' />
            </SelectTrigger>
            <SelectContent className='bg-[#111111]'>
                <SelectGroup>
                   <SelectLabel>Workspaces</SelectLabel>
                    <Separator />
                    {workspace.workspace.map((workspace)=> (
                        <SelectItem key={workspace.id} value={workspace.id}>
                            {workspace.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
        <Modal 
            title="Invite to workspace"
            description="Invite other users to your workspace" 
            trigger={
                <span className='text-sm cursor-pointer flex items-center justify-center border-t-neutral-800/90 hover:bg-neutral-800/30
                w-full rounded-sm p-[5px] gap-2
                '>
                    <PlusCircle size={16} 
                    className='text-neutral-400 font-semibold text-xs'
                    />
                    Invite To Workspace
                </span>
            }>
                <Search worksspaceId={activeWorkspaceId} />
        </Modal>
        <p className='w-full text-[#9D9D9D] font-bold mt-4'>
            Menu
        </p>
        <nav className='w-full'>
            <ul className='flex flex-col gap-y-2'>
               {menuItems.map((item)=>(
                <SidebarItem 
                  key={item.title} 
                  href={item.href} 
                  icon={item.icon} 
                  title={item.title}
                  selected={pathName === item.href} // Add required selected prop
                  notification={(item.title === "Notifications" && count._count && count._count.notification) || 0}
                />
               ))}
            </ul>

        </nav>
        <Separator className="w-4/5" />

        <p className='w-full text-[#9D9D9D] font-bold mt-4'>
            Workspaces
        </p>
 
    
    </div>
  )
}

export default Sidebar  

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
import { Link, Loader, Menu, MenuIcon, PlusCircle, PlusIcon, Users } from 'lucide-react'
import Search from '../global/search'
import { MENU_ITEMS } from '@/constant'
import SidebarItem from './sidebar-items'
import { Separator } from '../ui/separator'
import WorkspacePlaceholder from './workspace-placeholder'
import GlobalCards from '../global/global-card'
// import { SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
    Sheet, 
    SheetContent, 
    SheetHeader, 
    SheetTitle, 
    SheetTrigger 
  } from "@/components/ui/sheet"
import InfoBar from '../global/info-bar'

type Props = {
    activeWorkspaceId: string
}

const Sidebar = ({activeWorkspaceId}: Props) => {
    // TODO: Add the upgrade button
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

  const sidebarSection = (
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
        {
            workspace.workspace.length ===1 && workspace.members.length === 0 && 
                 <div className='w-full mt-[-10px]'>
                    <p className='text-[#3c3c3c] text-sm font-medium'>
                        {workspace.subscription?.plan === "FREE" ? 
                        "Upgrade to create workspaces" : "No workspace at all."
                    }
                    </p>
                </div>
        }
        <nav className='w-full'>
            <ul className='h-[150px] overflow-auto overflow-x-hidden fade-layer'>
               {workspace.workspace.length > 0 && workspace.workspace.map((item)=> (
                item.type !== "PERSONAL" && (
                <SidebarItem 
                  key={item.id}
                  href={`/dashboard/${item.id}`}
                  selected={pathName === `/dashboard/${item.id}`}
                  icon={<WorkspacePlaceholder>
                    {item.name.charAt(0).toUpperCase()}
                  </WorkspacePlaceholder>}
                  title={item.name}
                  notification={0}
                />
                )

               ))}

               {workspace.members.length > 0 && workspace.members.map((item)=> (
                <SidebarItem 
                  key={item.WorkSpace.id}
                  href={`/dashboard/${item.WorkSpace.id}`}
                  selected={pathName === `/dashboard/${item.WorkSpace.id}`}
                  icon={<WorkspacePlaceholder>
                    {item.WorkSpace.name.charAt(0).toUpperCase()}
                  </WorkspacePlaceholder>}
                  title={item.WorkSpace.name}
                  notification={0}
                />
               ))}
              
            </ul>
        </nav>

        <Separator className="w-4/5"/>
        {workspace.subscription?.plan === "FREE" &&
         <>
         <GlobalCards title="Upgrade to Pro"
          description="Unlock AI features like transcription, AI summary, and more."
          footer={<Button className='text-sm mt-2 w-full'>
            <Loader>
                Upgrade
            </Loader>
        </Button>}

          /> 
            


        </>}
 
    
    </div>
  )

  return (
    <div className="full">
        <InfoBar />
    <div className="md:hidden fixed my-4">
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2 bg-background">
            <Menu size={24} /> 
          </button>
        </SheetTrigger>
        <SheetContent side={'left'} className="p-0 w-fit h-full">
            {sidebarSection}
        </SheetContent>
      </Sheet>
      </div>
      <div className="md:block hidden h-full">
            {sidebarSection}
            
    </div>
    </div>

    
  );
}
  

export default Sidebar  

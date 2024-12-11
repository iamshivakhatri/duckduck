'use client'

import { Button } from '@/components/ui/button'
import { useQueryData } from '@/hooks/useQueryData'
import { getWorkspaces } from "@/actions/workspace"
import React from 'react'
import Modal from '../modal'
import { Input } from '@/components/ui/input'
import { FolderPlusIcon } from 'lucide-react'
import FolderPlusDuotine from '@/components/icons/folder-plus-duotone'
import WorkSpaceForm from '@/components/forms/workspace-form'

type Props = {}

const CreateWorkspace = (props: Props) => {
    const {data} = useQueryData(['user-workspaces'], getWorkspaces)
    const {data:plan} = data as {
        status: number
        data:{
            subscription: {
                plan: 'PRO' | 'FREE'
            } | null
        }
    }
    if (plan.subscription?.plan === "FREE") {
        return <> </>
    }
    
    if (plan.subscription?.plan === "PRO") {
        return (
            <Modal
            title="Create Workspace"
            description="Workspaces helps you collaborate with your team and manage your projects.
            You are assigned a default personal workspace where you can share videos in private with yourself."
            trigger={
            <Button className='bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl'>
                <FolderPlusDuotine />
                Create Workspace
            </Button>

            }  
            >
             <WorkSpaceForm />

            </Modal>
        )
    }
  return (
    <div>
      <Button>
        Create Workspace
      </Button>
    </div>
  )
}

export default CreateWorkspace
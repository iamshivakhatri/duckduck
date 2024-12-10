'use client'
import React from 'react'
import { WorkSpace } from '@prisma/client'
import { usePathname } from 'next/navigation'

type Props = {
    workspace: WorkSpace
}

const GlobalHeader = ({workspace}: Props) => {
    console.log("pathname", usePathname())
    const pathname = usePathname().split(`/dashboard/${workspace.id}`)[1]
    console.log("pathname", pathname)
  return <article className='flex flex-col gap-2'>
    <span className='text-[#707070] text-xs'>
        {workspace.type.toLocaleUpperCase()}
    </span>
    <h1 className='text-4xl font-bold'>
        {pathname && !pathname.includes('folder')? pathname.charAt(0).toUpperCase() + pathname.slice(1).toLowerCase()
         : 'My Library'}
    </h1>

  </article>
}

export default GlobalHeader
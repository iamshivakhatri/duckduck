import React from 'react'

type Props = {
    children: React.ReactNode
}

const WorkspacePlaceholder = ({children}: Props) => {
  return (
   <span className='bg-[#545454] font-bold  w-8 px-2 h-7 rounded-sm text-[#1D1D1D] flex items-center justify-center'>
    {children}
   </span>
  )
}

export default WorkspacePlaceholder
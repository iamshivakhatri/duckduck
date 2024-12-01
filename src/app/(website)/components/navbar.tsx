import { MenuIcon } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

type Props = {}

const LandingPageNavbar = (props: Props) => {
  return (
    <div className='flex w-full justify-between items-center'>
        <div className='text-3xl font-semibold flex items-center gap-x-3'>
            <MenuIcon />
            <Image 
            src="/opal-logo.svg" 
            alt="logo" width={30}
             height={30}
             />
        </div>
        LandingPageNavbar
    </div>
  )
}

export default LandingPageNavbar
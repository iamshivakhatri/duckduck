import { MenuIcon, User } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {}

const LandingPageNavbar = (props: Props) => {
  return (
    <div className='flex w-full justify-between items-center'>
        <div className='text-3xl font-semibold flex items-center gap-x-3'>
            <MenuIcon />
            <Image 
            src="/opal-logo.svg" 
            alt="logo"
            width={30}
            height={30}
            />
            DuckDuck


        </div>

        <div className='hidden gap-x-10 items-center lg:flex '>
            <Link href="/" className='bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80 transition-all duration-300'>  Home </Link>
            <Link href="/">  Pricing </Link>
            <Link href="/">  Contact</Link>





        </div>

        <Link href="/sign-in">  
        <Button className=''>
            <User className='mr-2' />
            Sign In
        </Button>
        
        </Link>

        LandingPageNavbar
    </div>
  )
}

export default LandingPageNavbar
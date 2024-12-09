import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

type Props = {
    title: string
    description: string
    children?: React.ReactNode
    footer?: React.ReactNode
}

const GlobalCards = ({title, description, children, footer}: Props) => {
  return (
  <Card className="bg-transparent mt-4">
    <CardHeader className='p-4'>
        <CardTitle className='text-md text-[#9D9D9D]'>
            {title}
        </CardTitle>
        <CardDescription className='text-[#707070]'>
            {description}
        </CardDescription>
    </CardHeader>
    <div className='pt-4'>
        {children && <div className='p-4'>{children}</div>}
        {footer && <div className='p-4'>{footer}</div>}
    </div>
  </Card>
  )
}

export default GlobalCards
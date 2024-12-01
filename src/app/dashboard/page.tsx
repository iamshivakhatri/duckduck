import React from 'react'
import { redirect } from 'next/navigation'
import { onAuthenticatedUser } from '@/actions/user'

type Props = {}

const page = async(props: Props) => {
    // Authenticate user
    const auth = await onAuthenticatedUser()

    // if(auth.status === 200 || auth.status ===201) {
    //     return redirect(`/dashboard/${auth.user?.firstname}${auth.user?.lastname}`)
    // }

    if (auth.status === 200 || auth.status === 201)
        return redirect(`/dashboard/${auth.user?.workspace[0].id}`)

    if (auth.status === 400 || auth.status === 500 || auth.status === 404 || auth.status === 403) {
        redirect('/sign-in')
    }

    
  return (
    <div>page</div>
  )
}

export default page
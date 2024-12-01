import React from 'react'

type Props = {
    params: {
        workspaceId: string
    },
    children: React.ReactNode
}

const layout = ({ params, children }: Props) => {

  return (
    <div>
        {children}
    </div>
  )
}

export default layout
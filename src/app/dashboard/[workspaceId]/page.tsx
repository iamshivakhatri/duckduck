import { redirect } from 'next/navigation'

const DashboardPage = async ({ params }: { params: { workspaceId: string } }) => {
  return (
    <div>
      {/* DashboardPage {params.workspaceId} */}
    </div>
  )
}

export default DashboardPage

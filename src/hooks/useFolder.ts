"use client"
import { useAppSelector } from "@/redux/slices/store"
import { use, useEffect, useState } from "react"
import { useMutationData } from "./useMutationData"
import { getWorkspaceFolders, moveVideoLocation } from "@/actions/workspace"
import useZodForm from "./useZodForm"
import { moveVideoSchema } from "@/components/forms/change-video-location/schema"

export const useMoveVideos = (videoId:string, currentWorkspace: string, currentFolderId: string) =>{

  console.log("videoid", videoId, currentWorkspace)
  // get state redux
  const {folders} = useAppSelector(state => state.FolderReducer)
  const {workspaces} = useAppSelector(state => state.WorkSpaceReducer)
 

  //fetching states
  const [isFetching, setIsFetching] = useState(false)

  const [isFolders, setIsFolders] = useState<
  |({
    _count: {
        videos: number
    }
  }& {
    id: string
    name: string
    createdAt: Date
    workSpaceId: string | null
  })[]
  | undefined
  >(undefined)
  // stat folders

  // use mutation data

  const {mutate, isPending} = useMutationData(
    ['change-video-location'],
    (data:{folder_id: string, workspace_id: string}) => moveVideoLocation(videoId, data.workspace_id,  data.folder_id,),


  )

  
  // usezodform 
  const {errors, onFormSubmit, watch, register}  = useZodForm(
    moveVideoSchema,
     mutate,
    {folder_id: currentFolderId, workspace_id: currentWorkspace}
    )

  // fetch folders with a useeffect
  const fetchFolders = async (workspace: string) => {
    setIsFetching(true)
    const folders = await getWorkspaceFolders(workspace)
    setIsFetching(false)
    setIsFolders(folders.data)
    
  }

  useEffect(() => {
    fetchFolders(currentWorkspace)
  }, [])

  useEffect(() => {
    const workspace = watch(async(value) =>{
        if(value.workspace_id){
            fetchFolders(value.workspace_id)
        }
    })
    return() => workspace.unsubscribe()
    }, [watch])

    return {
        folders,
        workspaces,
        isFetching,
        isFolders,
        onFormSubmit,
        register,
        errors,
        isPending
    }

}
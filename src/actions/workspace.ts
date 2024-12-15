"use server"
import prismadb from "@/lib/prismadb"
import { currentUser } from "@clerk/nextjs/server"

export const verifyAccessToWorkspace = async (workspaceId: string) => {
    try{
        const user = await currentUser()
        if(!user) return {status: 403, data: {workspace: null}}
        const isUserInWorkspace = await prismadb.workSpace.findUnique({
            where:{
                id: workspaceId,
                OR:[
                    {
                    User:{
                        clerkid: user.id,
                    },
                },
                {
                    members:{
                        every:{
                            User:{
                                clerkid:user.id,
                            }
                        }
                    }
                }
            ]
              
            },

        })

     return {
        status: 200,
        data: {workspace: isUserInWorkspace}
     }


    }catch(error){
        return {
            status: 500,
            data: {workspace: null}
        }
    }
    
}


export const getWorkspaceFolders = async (workSpaceId: string) => {
    try{
        const isFolders = await prismadb.folder.findMany({
            where:{
                workSpaceId
            },
            include:{
                _count:{
                    select:{
                        videos: true,
                    }
                }
            }
        })
        if (isFolders && isFolders.length > 0) return {
            status: 200,
            data: isFolders
        }

        return {
            status: 404,
            data: []
        }
    }catch(error){
        return {
            status: 403,
            data: []
        }
    }
}

export const getAllUserVideos = async (workSpaceId: string) => {
    
    try{
        const isVideos = await prismadb.video.findMany({
            where:{
                OR:[
                    {workSpaceId},
                    {folderId:workSpaceId}
                ]
            },
            select:{
                id:true,
                title:true,
                description:true,
                createdAt:true,
                source:true,
                processing:true,
                Folder:{
                    select:{
                        id: true,
                        name: true,
                    }
                },
                User:{
                    select:{
                        firstname: true,
                        lastname: true,
                        image: true
                    }
                },
              
            },
            orderBy:{
                createdAt: "asc"
            }
        })
        if (isVideos && isVideos.length > 0) return {
            status: 200,
            data: isVideos
        }

        return {
            status: 404,
            data: []
        }

    }catch(error){
        return {
            status: 400,
            data: []
        }
    }
}

export const getWorkspaces = async () => {
    try{
        const user = await currentUser()
        if(!user) return {
            status: 404,
            data: []
        }
        const workspaces = await prismadb.user.findUnique({
            where:{
                clerkid: user.id
            },
            select:{
                subscription: {
                    select:{
                        plan: true,
                    }
                },
                workspace: {
                    select:{
                        id: true,
                        name: true,
                        type: true,
                    }
                },
                members: {
                    select:{
                        WorkSpace:{
                            select:{
                                id: true,
                                name: true,
                                type: true,
                            }
                        }
                    }
                }
            }
        })
        return {
            status: 200,
            data: workspaces
        }
    }catch(error){
        return {
            status: 400,
            data: []
        }
    }
}

export const getNotifications = async () => {
    try{
        const user = await currentUser()
        if(!user) return {
            status: 403,
            data: []
        }

        const notifications = await prismadb.user.findUnique({
            where:{
                clerkid: user.id
            },
            select:{
                notification: true,
                _count:{
                    select:{
                        notification: true,
                    }
                }
            }
        })

        if(notifications && notifications._count.notification > 0){
            return {
                status: 200,
                data: notifications
        }
    }


    return {
        status: 404,
        data: []
    }
    
    }catch(error){
        return {
            status: 400,
            data: []
        }
    }
}

export const createWorkSpace = async (name: string) => {
    try{
        const user = await currentUser()
        if(!user) return {
            status: 404,
            data: []
        }
        const authorized = await prismadb.user.findUnique({
            where:{
                clerkid: user.id
            },
            select:{
                subscription: {
                    select:{
                        plan: true,
                    }
                }
            }
        })

        if (authorized && authorized.subscription?.plan === "PRO") {
            const workspace = await prismadb.user.update({
                where:{
                    clerkid: user.id
                },
                data:{
                    workspace: {
                        create: {
                            name,
                            type: "PUBLIC",
                        }
                    }
                }
            })
            if (workspace) return {
                status: 201,
                data: workspace
            }

        }
        return {
            status: 401,
            data: "You are not authorized to create a workspace"
        }

    }catch(error){
        return {
            status: 400,
            data: []
        }
    }
}


export const renameFolders = async (folderId: string, name: string) => {
    try{
        console.log("folderId", folderId, "name", name)
        const folder = await prismadb.folder.update({
            where:{id: folderId},
            data:{name}
        })
        if (folder) return {
            status: 200,
            data: "Folder renamed successfully"
        }
        return {
            status: 400,
            data: "Folder doesn't exist"
        }
    }catch(error){
        return {
            status: 500,
            data: "Something went wrong"
        }
    }
}

export const createFolder = async(workspaceId:string) =>{
    try{
        const isNewFolder = await prismadb.workSpace.update({
            where:{
                id: workspaceId
            },
            data:{
                folders:{
                    create:{
                        name:"Untitled"
                    }
                }
            }
        })
        if(isNewFolder) return {
            status: 200,
            data: isNewFolder
        }
        return {
            status: 400,
            data: "Folder not created"
        }
    }catch(error){
        return {
            status: 500,
            data: "Something went wrong"
        }

    }
}

export const getFolderInfo = async (folderId: string) => {
    try{
        const folder = await prismadb.folder.findUnique({
            where:{
                id: folderId
            },
            select:{
                name: true,
                _count:{
                    select:{
                        videos: true
                    }
                }

            }
        })
        if(folder) return {
            status: 200,
            data: folder
        }
        return {
            status: 404,
            data: "Folder not found"
        }
    }catch(error){
        return {
            status: 500,
            data: "Something went wrong"
        }
    }
}
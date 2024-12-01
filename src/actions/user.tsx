
import { currentUser } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export const onAuthenticatedUser = async () => {
    try{
        const user = await currentUser();

        if (!user) {
            return {status: 403}
        }

        const userExist = await prismadb.user.findUnique({
            where: {
                clerkid: user.id
            },
            include: {
                workspace:{
                    where:{
                        User:{
                            clerkid: user.id
                        },
                    },
                    
                },
            }
        })

        if (userExist) {
            return {status: 200, user: userExist}
        }

        const newUser = await prismadb.user.create({
            data: {
                firstname: user.firstName,
                lastname: user.lastName,
                clerkid: user.id,
                email: user.emailAddresses[0].emailAddress,
                image: user.imageUrl,
                studio: {
                    create: {}
                },
                subscription: {
                    create: {}
                },
                workspace: {
                    create:{
                        name: `${user.firstName}'s Workspace`,
                        type: "PERSONAL"
                    }
                }

            },

            include: {
                workspace: true,
                subscription: true,
            }
        })

        if (newUser) {
            return {status: 200, user: newUser}
        }

        return {status: 500}
    } catch (error) {
        console.log(error);
        return {status: 500}
    }
}
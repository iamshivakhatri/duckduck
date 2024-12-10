import { useMutationData } from "./useMutationData"
import { createWorkSpace } from "@/actions/workspace"
import useZodForm from "./useZodForm"
import { workSpaceSchema } from "@/components/forms/workspace-form/schema"
export const useCreateWorkSpace = () =>{
    const {mutate, isPending} = useMutationData(
        ['create-workspace'], (data:{name:string})=> createWorkSpace(data.name),
        "user-workspaces"
    )

    const {errors, onFormSubmit, register} = useZodForm(workSpaceSchema, mutate)

    return {errors, onFormSubmit, register, isPending}


}
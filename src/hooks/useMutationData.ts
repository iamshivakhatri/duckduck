import { MutationKey, MutationFunction, useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useMutationData = (
    mutationKey: MutationKey,
    mutationFn: MutationFunction<any, any>,
    queryKey?: string,
    onSuccess?: () => void,
) => {
    const client = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationKey,
        mutationFn,
        onSuccess: (data) => {
            if (onSuccess) onSuccess()
            return toast(
                data?.status === 200 || data?.status === 201 ? 'Success' : 'Error',
                {
                    description: data?.message,
                }
            )
        },
        onSettled: async () => {
            return await client.invalidateQueries({
                queryKey: queryKey ? [queryKey] : undefined,
                exact: true,
            })
        },
    })
    return {mutate, isPending}
}

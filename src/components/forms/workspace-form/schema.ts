import z from "zod"

export const workSpaceSchema = z.object({
    name: z.string().min(1, {message: "Name must be at least 1 characters long"}),
})
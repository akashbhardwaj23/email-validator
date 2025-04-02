import {z} from "zod"

// Could have done validation of password in zod
export const LoginInput = z.object({
    email : z.string().email(),
    password : z.string()
})
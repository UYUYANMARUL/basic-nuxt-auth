import * as z from "zod"

export const UserForgotPasswordFormV = z.object({
    email: z.string().min(1,{message:"It can not be Empty"}).email(),
  })

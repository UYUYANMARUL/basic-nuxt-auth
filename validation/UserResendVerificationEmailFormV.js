

import * as z from "zod"



export const UserResendVerificationEmailFormV = z.object({
    email: z.string().min(1,{message:"It can not be Empty"}).email(),
  })

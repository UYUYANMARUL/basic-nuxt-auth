import * as z from "zod"

export const UserLoginFormV = z.object({
    email: z.string().min(1,{message:"It can not be Empty"}).email(),
    password:z.string().regex(new RegExp('(?=.*[a-z])'),"must contain lowercase letter").regex(new RegExp('(?=.*[A-Z])'),"must contain uppercase letter").regex(new RegExp("(.*[*.!@#$%^&(){}[\\]:\";'<>,.?~`_+-=|]+.*)"),"require at least one special character"),
  })

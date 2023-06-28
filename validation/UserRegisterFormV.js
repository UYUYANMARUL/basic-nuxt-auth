import * as z from "zod"



export const UserRegisterFormV = z.object({
    email: z.string().min(1,{message:"It can not be Empty"}).email(),
    password:z.string().regex(new RegExp('(?=.*[a-z])'),"must contain lowercase letter").regex(new RegExp('(?=.*[A-Z])'),"must contain uppercase letter").regex(new RegExp("(.*[*.!@#$%^&(){}[\\]:\";'<>,.?~`_+-=|]+.*)"),"require at least one special character"),
    password_confirmation:z.string().regex(new RegExp('(?=.*[a-z])'),"must contain lowercase letter").regex(new RegExp('(?=.*[A-Z])'),"must contain uppercase letter").regex(new RegExp("(.*[*.!@#$%^&(){}[\\]:\";'<>,.?~`_+-=|]+.*)"),"require at least one special character"),
    firstname:z.string(),
    lastname:z.string(),
    gender:z.string(),
    birthday:z.date(),
    is_whatsapp:z.boolean(),
    phone:z.string().regex(new RegExp(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
    ),"invalid numbers")
  })

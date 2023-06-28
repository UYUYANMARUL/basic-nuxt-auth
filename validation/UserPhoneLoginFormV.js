import * as z from "zod"

export const UserPhoneLoginFormV = z.object({
    phone:z.string().regex(new RegExp(
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
      ),"invalid numbers")
  })

import { ZodObject } from 'zod';
export default defineNuxtPlugin((nuxtApp)=>{

    
    const GetFormErrors = (Form,ValidationSchema) => {
        return ValidationSchema.safeParse(Form)?.error?.formErrors.fieldErrors
    }

    const  GetFieldErrors = (Field,ValidationSchema) => {
        return ValidationSchema.safeParse(Field)?.error?.issues?.map((data)=>{return data.message})
    }


    return {
        provide:{
          FormValidation:{
             GetFormErrors,
             GetFieldErrors
          }

    }}

})
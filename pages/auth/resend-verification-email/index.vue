<template>
  

    <div class="flex flex-1 items-center justify-center">
          <div class="rounded-lg sm:border-2 px-4 lg:px-20 py-16 lg:max-w-xl sm:max-w-md w-full text-center mt-48">
            <Form class="text-center" :Submitted="Submitted" @Submit="(data)=>{OnSubmit(data)}" @FailedSubmit="Submitted=false" :FormV="UserResendVerificationEmailFormV">
              <template #default={form,submiterror}>
                  <h1 class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                  Resend Verification Email
                  </h1>
                  <div class="py-2 text-left">
                    <Input v-model="form.email" type="email" name="email" :errors="$FormValidation.GetFieldErrors(form.email,UserResendVerificationEmailFormV.shape.email)" Placeholder="Email" :submiterror="submiterror"/>
                  </div>
                  </template>
                  <template v-slot:button>
                  <div class="py-2">
                    <button  @click="Submitted=true" type="submit" class="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700">
                      Resend
                      </button>
                  </div>
                </template>
              </Form>
          </div>
      </div>
  
  
    </template>
    
    <script setup>
  import { UserResendVerificationEmailFormV } from '~/validation/UserResendVerificationEmailFormV';
  
    
     
  
  const {$FormValidation,$http,$ResponseHandler,$inforoute} = useNuxtApp()
    
     

  const Submitted = ref(false)

  function OnSubmit(data) {
    $http.Post(`/auth/resend-verification-email?email=${data.email}`,{body:data,onResponse:(res)=>{$ResponseHandler.response(res)}}).then(
      ()=>{
        $inforoute.route("/auth/login","Verification Email Send",ToastrMessageType.Success,ToastrPosition.TopCenter)
      },
      ()=>{
        Submitted.value=false
      }
    )

  }
  
    </script>
  
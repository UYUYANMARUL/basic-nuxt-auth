<template>
  

    <div class="flex flex-1 items-center justify-center">
          <div class="rounded-lg sm:border-2 px-4 lg:px-20 py-16 lg:max-w-xl sm:max-w-md w-full text-center mt-48">
            <Form class="text-center" :Submitted="Submitted" @Submit="(data)=>{OnSubmit(data)}" @FailedSubmit="Submitted=false" :FormV="UserPhoneLoginValidateFormV" :ExternalFormData="phone">
              <template #default={form,submiterror}>
                  <h1 class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                  Login
                  </h1>
                  <div class="py-2 text-left">
                    <Input disabled="true" v-model="form.phone" type="text" name="phone" :errors="$FormValidation.GetFieldErrors(form.phone,UserPhoneLoginValidateFormV.shape.phone)" Placeholder="Phone Number" :submiterror="submiterror"/>
                  </div>
                  <div class="py-2 text-left">
                    <Input v-model="form.otp" type="text" name="otp" :errors="$FormValidation.GetFieldErrors(form.otp,UserPhoneLoginValidateFormV.shape.otp)" Placeholder="Verification Number" :submiterror="submiterror"/>
                  </div>
              </template>
              <template v-slot:button>
                  <div class="py-2">
                      <button  @click="Submitted=true" type="submit" class="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700">
                      Login
                      </button>
                  </div>
                </template>
              </Form>

          </div>
      </div>
  
  
    </template>
    
    <script setup>
      import { ToastrMessageType, ToastrPosition } from '~/plugins/notification';
  import { UserPhoneLoginValidateFormV } from '~/validation/UserPhoneLoginValidateFormV';
  
    
     
  
  const {$FormValidation,$http,$inforoute,$ErrorHandler,$auth} = useNuxtApp()
const route = useRoute()

    const Submitted = ref(false)
const phone = {phone:route.query.phone}
  
  function OnSubmit(data) {
    $http.Post("/auth/phone-login-validate",{body:data,onResponseError:(err)=>{$ErrorHandler.responseError(err)}}).then(
      ()=>{
        $auth.login(res).then(()=>{$inforoute.route(true,"/","Login Completed We Are Routing You Main Page",ToastrMessageType.Success,ToastrPosition.TopCenter)})
      },
      ()=>{
        Submitted.value=false
      }
    )

  }
  
    </script>
  
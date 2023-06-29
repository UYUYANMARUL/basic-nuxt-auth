<template>
  

    <div class="flex flex-1 items-center justify-center">
          <div class="rounded-lg sm:border-2 px-4 lg:px-20 py-16 lg:max-w-xl sm:max-w-md w-full text-center mt-48">
            <Form class="text-center" :Submitted="Submitted" @Submit="(data)=>{OnSubmit(data)}" @FailedSubmit="Submitted=false" :FormV="UserPhoneLoginFormV">
              <template #default={form,submiterror}>
                  <h1 class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                  Phone Login
                  </h1>
                  <div class="py-2 text-left">
                    <Input v-model="form.phone" type="text" name="phone" :errors="$FormValidation.GetFieldErrors(form.phone,UserPhoneLoginFormV.shape.phone)" Placeholder="Phone Number" :submiterror="submiterror"/>
                  </div>
                  </template>
                  <template v-slot:button>
                  <div class="py-2">
                    <button  @click="Submitted=true" type="submit" class="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700">
                      Phone Login
                      </button>
                  </div>
                </template>
              </Form>
          </div>
      </div>
  
  
    </template>
    
    <script setup>
      import { ToastrMessageType, ToastrPosition } from '~/plugins/notification';
  import { UserPhoneLoginFormV } from '~/validation/UserPhoneLoginFormV';
  
    
     
  
  const {$FormValidation,$http,$ErrorHandler,$inforoute} = useNuxtApp()
    
     

  const Submitted = ref(false)

  function OnSubmit(data) {
    $http.Post("/auth/phone-login",{body:data,onResponseError:(res)=>{$ErrorHandler.responseError(res)}}).then(
      ()=>{
        $inforoute.route(false,`/auth/phone-login-validate?phone=${data.get("phone")}`,"",ToastrMessageType.Success,ToastrPosition.TopCenter,"",1)
      },
      ()=>{
        Submitted.value=false
      }
    )
  }
  
    </script>
  
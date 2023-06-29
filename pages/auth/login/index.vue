<template>
  

  <div class="flex flex-1 items-center justify-center mt-16">
        <div class="rounded-lg sm:border-2 px-4 lg:px-20 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
            <Form class="text-center" :Submitted="Submitted" @Submit="(data)=>{OnSubmit(data)}" @FailedSubmit="Submitted=false" :FormV="UserLoginFormV">
              <template #default={form,submiterror}>
                <h1 class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                Login
                </h1>
                <div class="py-2 text-left">
                  <Input v-model="form.email" type="email" name="email" :errors="$FormValidation.GetFieldErrors(form.email,UserLoginFormV.shape.email)" Placeholder="Email" :submiterror="submiterror"/>
                </div>
                <div class="py-2 text-left">
                  <Input v-model="form.password" type="password" name="password" :errors="$FormValidation.GetFieldErrors(form.password,UserLoginFormV.shape.password)" Placeholder="Password" :submiterror="submiterror"/>
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
            <div class="text-center mt-12">
                <span>
                    Do you have an account?
                </span>
                <NuxtLink to="/auth/register" class="font-light text-md text-indigo-600 underline font-semibold hover:text-indigo-800">Sign In</NuxtLink>
            </div>
            <div class="text-center mt-6">
                <span>
                    Did you Forgot password?
                </span>
                <NuxtLink to="/auth/forgot-password" class="font-light text-md text-indigo-600 underline font-semibold hover:text-indigo-800">Reset Password</NuxtLink>
            </div>
        </div>
    </div>


  </template>
  

    
    <script setup>
  import { ToastrPosition,ToastrMessageType } from '~/plugins/notification';
import { UserLoginFormV } from '~/validation/UserLoginFormV';
  


  
  const {$FormValidation,$http,$auth,$ResponseHandler,$inforoute} = useNuxtApp()


  const Submitted = ref(false)
     
  function OnSubmit(data) {

    $http.Post("/auth/login",{body:data,onResponse:(res)=>{$ResponseHandler.response(res)}}).then((res)=>{
      $auth.login(res)
      $inforoute.route(true,"/","Login Completed We Are Routing You Main Page",ToastrMessageType.Success,ToastrPosition.TopCenter)
    
    },()=>{
      Submitted.value=false
    })
  
  }
  
  

  
    </script>
  

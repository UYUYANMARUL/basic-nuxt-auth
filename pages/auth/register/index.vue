<template>
  




    <div class="flex flex-1 items-center justify-center mt-16">
          <div class="rounded-lg sm:border-2 px-4 lg:px-20 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
            <Form class="text-center" :Submitted="Submitted" @Submit="(data)=>{OnSubmit(data)}" @FailedSubmit="Submitted=false" :FormV="UserRegisterFormV" :Pipes="pipes" :FormType="false">
                <template #default={form,submiterror,Pipes}>
                  <h1 class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                  Sign Up
                  </h1>
                  <div class="py-2 text-left">
                    <Input v-model="form.email" type="email" name="email" :errors="$FormValidation.GetFieldErrors(form.email,UserRegisterFormV.shape.email)" Placeholder="Email" :submiterror="submiterror"/>
                  </div>
                  <div class="py-2 text-left inline w-16">
                    <Input v-model="form.firstname" type="text" name="firstname" :errors="$FormValidation.GetFieldErrors(form.firstname,UserRegisterFormV.shape.firstname)" Placeholder="FirstName" :submiterror="submiterror"/>
                  </div>
                  <div class="py-2 text-left inline ">
                    <Input v-model="form.lastname" type="text" name="lastname" :errors="$FormValidation.GetFieldErrors(form.lastname,UserRegisterFormV.shape.lastname)" Placeholder="LastName" :submiterror="submiterror"/>
                  </div>
                  <div class="py-2 text-left">
                    <Input v-model="form.phone" type="text" name="phone" :errors="$FormValidation.GetFieldErrors(form.phone,UserRegisterFormV.shape.phone)" Placeholder="Phone Number" :submiterror="submiterror"/>
                  </div>
                  <div class="py-2 text-left">
                    <Input v-model="form.password" type="password" name="password" :errors="$FormValidation.GetFieldErrors(form.password,UserRegisterFormV.shape.password)" Placeholder="Password" :submiterror="submiterror"/>
                  </div>
                  <div class="py-2 text-left">
                    <Input v-model="form.password_confirmation" type="password" name="password_confirmation" :errors="$FormValidation.GetFieldErrors(form.password_confirmation,UserRegisterFormV.shape.password_confirmation)" Placeholder="Password Confirmation" :submiterror="submiterror"/>
                  </div>
                  <div class="py-2 text-left">
                    <SelectBox v-model="form.gender" type="text" name="gender" :errors="$FormValidation.GetFieldErrors(form.gender,UserRegisterFormV.shape.gender)" Placeholder="Gender" :submiterror="submiterror" :options="gender"/>
                  </div>
                  <div class="py-2 text-left">
                    <DatePickerInput v-model="form.birthday" :errors="$FormValidation.GetFieldErrors(form.birthday,UserRegisterFormV.shape.birthday)" :submiterror="submiterror"/>
                  </div>
                  <div class="py-2 text-left">
                    <Input label="Do you have whatsapp" v-model="form.is_whatsapp" type="checkbox" name="is_whatsapp" :errors="$FormValidation.GetFieldErrors(form.is_whatsapp,UserRegisterFormV.shape.is_whatsapp)" Placeholder="is_whatsapp" :submiterror="submiterror"/>
                  </div>

                </template>
                <template v-slot:button>
                  <div class="py-2">
                      <button  @click="Submitted=true" type="submit" class="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700">
                      Sign Up
                      </button>
                  </div>
                </template>

                
              </Form>
              <div class="text-center mt-12">
                  <span>
                      Do you have an account?
                  </span>
                  <NuxtLink to="/auth/login" class="font-light text-md text-indigo-600 underline font-semibold hover:text-indigo-800">Login</NuxtLink>
              </div>
          </div>
      </div>
  
  
    </template>
    
    <script setup>
  import { UserRegisterFormV } from '~/validation/UserRegisterFormV';

    
  import { ToastrPosition,ToastrMessageType } from '~/plugins/notification';
import { UserLoginFormV } from '~/validation/UserLoginFormV';
  


  const gender = ["female","male"]
  const {$FormValidation,$http,$notify,$ResponseHandler,$inforoute} = useNuxtApp()
  const router = useRouter();
  const pipes = {"birthday":(value)=>{return `${value.getDate()}.${value.getMonth() + 1}.${value.getFullYear()}`},"is_whatsapp":(value)=>{return value == "true" ? true : false}}


  const Submitted = ref(false)
     
  function OnSubmit(data) {


    $http.Post("/auth/register",{body:data,onResponse:(err)=>{$ResponseHandler.response(err)}}).then(()=>{
      $inforoute.route(true,"/auth/login","Register Completed We Are Routing You",ToastrMessageType.Success,ToastrPosition.TopCenter)
  },()=>{Submitted.value=false})
  
  }


     
 


     

  

  
  
    </script>
  
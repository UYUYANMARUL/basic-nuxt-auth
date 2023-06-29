<template>
  <div class="ml-32">

    <div class="py-2 text-left inline-block ml-6" v-for="item in options">
      
      <input :value="item" :id="item" @focusout="errorcondition=true" @blur="errorcondition=true" v-model="model" type="radio"  :disabled="props.disabled" :name="props.name" class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " :placeholder=Placeholder />
      <label :for="item">{{ item }}</label>
      
    </div>
    <div v-if="errorcondition || props.submiterror" v-for="(item, index) in errors" :key="index" class="ml-12">
                  {{ item }}
                </div>
    

  </div>



</template>

<script setup>
import { validate } from '@babel/types';


const props = defineProps({
options : {
  type: Array,
  default:[]
},
modelValue: {
required: true,
},
label: {
type: String,
},
name: {
type: String,
required: true,
},
disabled: {
type: Boolean,
default: false,
},
errors: {
type: Object,
default: {},
},
Placeholder:{
type :String,
default: ""
},
submiterror:{
type:Boolean,
default:false
}
})
const emit = defineEmits(["update:modelValue", "validate"])


const errorcondition = ref(false);
const model = computed({
get: () => props.modelValue,
set: (value) => emit("update:modelValue", value),
})


</script>
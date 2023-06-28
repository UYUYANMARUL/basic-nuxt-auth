<template>
                <div class="py-2 text-left">
                    <input @focusout="errorcondition=true" @blur="errorcondition=true" v-model="model"  :type="props.type" :disabled="props.disabled" :name="props.name" class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " :placeholder=Placeholder />
                </div>
                <div v-if="errorcondition || props.submiterror" v-for="(item, index) in errors" :key="index">
                  {{ item }}
                </div>


</template>

<script setup>
import { validate } from '@babel/types';
import { ZodObject, boolean } from 'zod';


const props = defineProps({
    modelValue: {
      required: true,
    },
    type: {
      type: String,
      default: "text",
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
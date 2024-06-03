<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex items-center justify-between mb-3">
    <h1 v-if="!loading" class="text-3xl font-semibold">
      {{ user.id ? `Update user: "${user.name}"` : 'Create new User' }}
    </h1>
  </div>
  <div class="bg-white rounded-lg shadow animate-fade-in-down">
    <Spinner v-if="loading"
             class="absolute left-0 top-0 bg-white right-0 bottom-0 flex items-center justify-center z-50"/>
    <form v-if="!loading" @submit.prevent="onSubmit">
      <div class="grid grid-cols-3">
        <div class="col-span-2 px-4 pt-5 pb-4">
          <CustomInput class="mb-2" v-model="user.name" label="Name" :errors="errors['name']"/>
          <CustomInput type="email" class="mb-2" v-model="user.email" label="Email" :errors="errors['email']"/>
          <CustomInput type="number" class="mb-2" v-model="user.phone" label="Phone" :errors="errors['phone']"/>
          <CustomInput class="mb-2" v-model="user.address" label="Address" :errors="errors['address']"/>
          <CustomInput type="password" class="mb-2" v-model="user.password" label="Password" :errors="errors['password']"/>
        </div>
        <div class="col-span-1 px-4 pt-5 pb-4">
          <image-preview v-model="user.userimage"
                         :images="user.userimage"
                         v-model:deleted-images="user.deleted_images"
                         v-model:image-positions="user.image_positions"/>
        </div>
      </div>
            <footer class="bg-gray-50 rounded-b-lg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button type="submit"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                          text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500">
          Save
        </button>
        <button type="button"
                @click="onSubmit($event, true)"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                          text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500">
          Save & Close
        </button>
        <router-link :to="{name: 'User'}"
                     class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                     ref="cancelButtonRef">
          Cancel
        </router-link>
      </footer>
    </form>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import CustomInput from "../../../components/core/CustomInput.vue";
import store from "../../../store/index.js";
import Spinner from "../../../components/core/Spinner.vue";
import {useRoute, useRouter} from "vue-router";
import ImagePreview from "../../../components/ImagePreview.vue";
// import the component
//import Treeselect from 'vue3-treeselect'
// import the styles
//import 'vue3-treeselect/dist/vue3-treeselect.css'
import axiosClient from "../../../axios.js";

const route = useRoute()
const router = useRouter()

const user = ref({
  id: null,
  name: null,
  email: null,
  phone:null,
  address:null,
  userimage: [],
  password:null,
  deleted_images: [],
  image_positions: {},
})

const errors = ref({});

const loading = ref(false)
const options = ref([])

const emit = defineEmits(['update:modelValue', 'close'])

onMounted(() => {
  if (route.params.id) {
    loading.value = true
    store.dispatch('getUser', route.params.id)
      .then((response) => {
        loading.value = false;
        user.value = response.data
      })
  }


  
})

function onSubmit($event, close = false) {
  loading.value = true
  errors.value = {};
 
  if (user.value.id) {
    store.dispatch('updateUser', user.value)
      .then(response => {
        loading.value = false;
        if (response.status === 200) {
          user.value = response.data
          store.commit('showToast', 'Product was successfully updated');
          store.dispatch('getUsers2')
          if (close) {
            router.push({name: 'user'})
          }
        }
      })
      .catch(err => {
        loading.value = false;
        errors.value = err.response.data.errors
      })
  } else {
    store.dispatch('createUser', user.value)
      .then(response => {
        loading.value = false;
        if (response.status === 201) {
          user.value = response.data
          store.commit('showToast', 'User was successfully created');
          store.dispatch('getUsers2')
          if (close) {
            router.push({name: 'user'})
          } else {
            user.value = response.data
            //router.push({name: 'app.products.edit', params: {id: response.data.id}})
          }
        }
      })
      .catch(err => {
        loading.value = false;
        errors.value = err.response.data.errors
      })
  }
}
</script>

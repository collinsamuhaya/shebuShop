<template>
<div class="flex items-center justify-between mb-3">
    <h1 v-if="!loading" class="text-3xl font-semibold">
      {{ category.id ? `Update product: "${category.name}"` : 'Create new Category' }}
    </h1>
  </div>
  <div class="bg-white rounded-lg shadow animate-fade-in-down">
    <Spinner v-if="loading"
             class="absolute left-0 top-0 bg-white right-0 bottom-0 flex items-center justify-center z-50"/>
    <form v-if="!loading" @submit.prevent="onSubmit">
        <div class="grid grid-cols-3">
            <div class="col-span-2 px-4 pt-5 pb-4">
          <CustomInput class="mb-2" v-model="category.name" label="Category Name" :errors="errors['name']"/>
          <CustomInput class="mb-2" v-model="category.description" label="Description" :errors="errors['description']"/>
          
        </div>
        <div class="col-span-1 px-4 pt-5 pb-4">
          <image-preview v-model="category.categoryimage"
                         :images="category.categoryimage"/>
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
        <router-link :to="{name: 'Category'}"
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

const route = useRoute()
const router = useRouter()

const category = ref({
  id: null,
  name: null,
  categoryimage: [],
  deleted_images: [],
  description: [],
 
 
})
const errors = ref({});

const loading = ref(false)
const options = ref([])
function onSubmit($event, close = false) {
  loading.value = true
  errors.value = {};
 
  if (category.value.id) {
    store.dispatch('updateProduct', category.value)
      .then(response => {
        loading.value = false;
        if (response.status === 200) {
         category.value = response.data
          store.commit('showToast', 'Product was successfully updated');
          store.dispatch('getCategorys')
          if (close) {
            router.push({name: 'Category'})
          }
        }
      })
      .catch(err => {
        loading.value = false;
        errors.value = err.response.data.errors
      })
  } else {
    store.dispatch('createCategory', category.value)
      .then(response => {
        loading.value = false;
        if (response.status === 201) {
        category.value = response.data
          store.commit('showToast', 'Category was successfully created');
          store.dispatch('getCategorys')
          if (close) {
            router.push({name: 'Category'})
          } else {
            product.value = response.data
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
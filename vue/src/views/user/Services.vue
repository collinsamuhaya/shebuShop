<template>
           <div class="mx-auto max-w-2xl sm:text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Services</h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p>
        </div>
        <hr>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div v-for="service in services" :key="service.id" class="flex flex-cols py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px] "  >
            <div >
              <img  :src="require('../../assets/images/shoe.png')"  alt="" class="w-full h-38 object-cover"/>
                   
                    <h4 class="mt-4 text-lg font-bold">{{service.name}}</h4>
                    <p class="mt-4 text-sm ">{{service.description}}</p>
                    <router-link :to="{name:'Services',params:{id:service.id}}" class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                   fill="none" viewBox="0 0 24 24"  stroke="currentColor" class="h-5 w-5 mr-2">
                   <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                   </svg>
                   View Products
                 </router-link>
                </div>
       </div>
    </div>
 
</template>
<script setup>

import {useStore} from 'vuex'
import {computed,ref} from 'vue'
const store=useStore()
let realValues =[]
 
 const services = computed(()=>store.state.services.tmpServices); 





</script>
<style scoped>
</style>
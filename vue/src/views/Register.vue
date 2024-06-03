<template>
      <Guestlayout title="Register for free">
        <p class="mt-2 text-center text-sm text-gray-600">
      <router-link :to="{name:'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500">Login to your account</router-link>
    </p>
       <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  
        <form class="space-y-6" @submit="register">
          <div>
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Full names</label>
            <div class="mt-2">
              <input id="name" name="name" v-model ="user.name"  type="text" autocomplete="name" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" v-model ="user.email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone</label>
            <div class="mt-2">
              <input id="phone" name="phone" v-model ="user.phone" type="text" autocomplete="phone" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
            <div class="mt-2">
              <input id="address" name="address" v-model ="user.address" type="text" autocomplete="address" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="userimage" class="block text-sm font-medium leading-6 text-gray-900">User Image</label>
            <div class="mt-2">
              <input id="userimage" name="userimage" v-on:change ="user.userimage" type="file" autocomplete="userimage" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div class="mt-2">
              <input id="password" name="password" v-model ="user.password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div class="mt-2">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
              <input id="password_confirmation" name="password_confirmation" v-model ="user.password_confirmation" type="password" autocomplete="confirm-password_confirmation" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
           <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
          </div>
        </form>
        </div>
   
</Guestlayout>
    </template>
  <script setup>
         import Guestlayout from "../components/Guestlayout.vue";
         import store from '../store';
import {useRouter} from 'vue-router'
const router=useRouter()
const user={
  name:'',
  email:'',
  phone:'',
  address:'',
  userimage:'',
  password:'',
  password_confirmation:''
}
function register(ev){
  ev.preventDefault();
  store
     .dispatch('register',user)
     .then((res)=>{
      alert(JSON.stringify(res)+ res.user)
      router.push({name:'UserDashboard'})
     })
}

 </script> 
<style scoped>
</style>
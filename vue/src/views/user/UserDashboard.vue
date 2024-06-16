<template>
    <div class="relative isolate overflow-hidden bg-gray-50 py-24 sm:py-32">
      <img :src="require('../../assets/images/hero_1.jpg')"  alt="" class="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center" />
      <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
        <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
        <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">WISEMAN’S PHARMARCY LTD</h2>
          <p class="mt-6 text-lg leading-8 text-gray-300">We are well stocked and offer fast professional services and our products are competitively priced.</p>
        </div>
        <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            <a v-for="link in links" :key="link.name" :href="link.href">{{ link.name }} <span aria-hidden="true">&rarr;</span></a>
          </div>
          <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="stat in stats" :key="stat.name" class="flex flex-col-reverse">
              <dt class="text-base leading-7 text-gray-300">{{ stat.name }}</dt>
              <dd class="text-2xl font-bold leading-9 tracking-tight text-white">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
   import backgroundimage from "../../assets/images/hero_1.jpg";
  const links = [
    { name: 'Your Health Care Partners', href: '#' },
    { name: 'At JF Centre- Ralph Bunche Road', href: '#' },
    { name: 'Talk to Doctors for free', href: '#' },
    { name: 'Delivery within Nairobi', href: '#' },
  ]
  const stats = [
    { name: '24 Hours on-line services. Talk to Doctors for free. Delivery within Nairobi. Upload valid prescription', value: 'Why choose Wiseman\'s?' },
    { name: 'To provide quality, affordable and patient centred products and services while ensuring efficiency.', value: 'Mission' },
    { name: 'To be leaders in providing High quality pharmaceutical, personal health care and beauty products to our clients.', value: 'Vision' },
    { name: 'Personalized Customer Service,    Integrity,  Honesty and   Passionate about our Quality of Products    ', value: 'Our values' },
  ]
  </script>
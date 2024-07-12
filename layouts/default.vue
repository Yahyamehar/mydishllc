<template>
    <div>
      <header-component />
      <div>
        <slot />
      </div>
      <footer-component />
    </div>
  </template>
  
  <script setup>
  import HeaderComponent from '~/components/Header.vue';
  import FooterComponent from '~/components/Footer.vue';
  </script>
  
  <style scoped>
  /* Your styles go here */
  </style>
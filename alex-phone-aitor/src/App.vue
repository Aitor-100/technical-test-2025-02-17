<script setup>
import { RouterLink, RouterView } from 'vue-router'
import IconCart from './components/icons/IconCart.vue';
</script>

<template>
  <header>
    <nav>
        <RouterLink to="/" class="logo"> <img alt="AlexPhone logo" src="@/assets/logo.svg" /></RouterLink>
        <RouterLink to="/cart"><IconCart class="icon" :showCount="true"/></RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header{
  background-color: var(--color-heading);
}
header nav{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 4rem;
}

.icon{
  height: 40px;
  width: 40px;
  color: var(--color-icon);
}

a{
  transition: transform 0.3s ease-in-out;
}

a:hover{
  transform: scale(1.2)
}

@media (max-width: 700px) {
    .product-container{
      flex-direction: column;
      gap: 0;
    }

    .product-image img{
      width: 180px;
    }
  }
</style>

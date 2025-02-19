<script setup>
import { RouterLink, RouterView } from 'vue-router'
import IconCart from './components/icons/IconCart.vue';
</script>

<template>
  <header>
    <nav>
        <RouterLink to="/" class="logo"> <img alt="AlexPhone logo" src="@/assets/logo.svg" /></RouterLink>
        <RouterLink to="/cart"><IconCart class="icon"/></RouterLink>
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
/*
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}*/
/*
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}*/
</style>

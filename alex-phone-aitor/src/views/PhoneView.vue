<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";

import IconCart from "@/components/icons/IconCart.vue";

const route = useRoute();
const product = ref(null);
const cartStore = useCartStore();


//Peticion a la APi para los detalles del iphone
onMounted(async () => {
  try {
    const response = await fetch(`https://test.alexphone.com/api/v1/sku/${route.params.sku}`);
    product.value = await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
  }
});


</script>

<template>
    <main v-if="product" class="product-container">
      <!-- Imagen a la izquierda -->
      <div class="product-image">
        <img :src="product.image" :alt="product.name" draggable="false" />
      </div>
  
      <!-- Información a la derecha -->
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="price"><strong>${{ product.price }}</strong></p>
        <p class="description">{{ product.description }}</p>
        <p><strong>Capacidad:</strong> {{ product.storage }}GB</p>
        <p><strong>Grado:</strong> {{ product.grade }}</p>
        <p><strong>Color:</strong> {{ product.color }}</p>
  
        <!-- Botón para añadir al carrito -->
        <button @click="cartStore.addToCart(product)">Añadir al carrito <IconCart class="icon"/></button>
      </div>
    </main>
  </template>
  
  <style scoped>
  .product-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    max-width: 800px;
    margin: auto;
  }
  
  .product-image img {
    width: 300px;
    height: auto;
    border-radius: 10px;
  }
  
  .product-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .price {
    font-size: 1.5rem;
    color: var(--color-principal);
  }
  
  button {
    margin-top: 1rem;
    padding: 0.8rem;
    border: none;
    background-color: var(--color-principal);
    color: var(--color-icon);
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;

    display: flex
;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }

  .icon{
    height: 30px;
    width: 30px;
    color: var(--color-icon);
  }
  
  button:hover {
    background-color: var(--color-secundario);
  }
  </style>
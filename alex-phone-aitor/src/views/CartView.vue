<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

</script>

<template>
  <main class="cart-container">
    <h1>Carrito de Compras</h1>

    <div v-if="cartStore.cart.length === 0">
      <p>Tu carrito está vacío.</p>
    </div>

    <div v-else>
      <ul>
        <li v-for="(item, index) in cartStore.cart" :key="index">
          <img :src="item.image" :alt="item.name" />
          <div>
            <p>
              <strong>{{ item.name }}</strong>
            </p>
            <p>${{ item.price }}</p>
            <div class="count">
              <button @click="cartStore.decreaseQuantity(index)">-</button>
              <p>{{ item.count }}</p>
              <button @click="cartStore.increaseQuantity(index)">+</button>
            </div>
          </div>
          <button class="remove" @click="cartStore.removeFromCart(index)">x</button>
        </li>
      </ul>

      <h3>Total: ${{ cartStore.totalPrice }}</h3>
      <button  @click="cartStore.confirmOrder">Realizar Pedido</button>
    </div>
  </main>
</template>

<style scoped>
.cart-container {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

li img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}

button {
  background-color: var(--color-principal);
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: var(--color-secundario);
}
.remove {
  margin: 0 0 auto auto;
  height: 30px;
  width: 30px;
}
.count {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  flex-direction: row;
}

.count button {
  height: 24px;
  width: 24px;
  font-size: large;
  padding: 0;
}

.count button:first-child {
  margin: 0 1rem 0 0;
}

.count button:last-child {
  margin: 0 0 0 1rem;
}
</style>

<script setup>
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const checkout = async () => {
  try {
    const response = await fetch("https://test.alexphone.com/api/v1/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: cartStore.cart })
    });

    if (response.ok) {
      alert("Pedido realizado con éxito");
      cartStore.clearCart();
      router.push("/");
    } else {
      alert("Hubo un problema con la compra");
    }
  } catch (error) {
    console.error("Error en la compra:", error);
  }
};
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
            <p><strong>{{ item.name }}</strong></p>
            <p>${{ item.price }}</p>
            <div>
              <button @click="cartStore.decreaseQuantity(index)">-</button>
              <p>{{ item.count }}</p>
              <button @click="cartStore.increaseQuantity(index)">+</button>
            </div>
            
          </div>
          <button @click="cartStore.removeFromCart(index)">x</button>
        </li>
      </ul>

      <h3>Total: ${{ cartStore.totalPrice }}</h3>
      <button @click="checkout">Realizar Pedido</button>
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
  background-color: red;
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}
</style>

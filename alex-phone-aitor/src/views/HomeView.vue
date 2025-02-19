<script setup>
import { ref, onMounted } from "vue";
import PhoneCard from "@/components/PhoneCard.vue";

const products = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("https://test.alexphone.com/api/v1/skus");
    const data = await response.json();
    products.value = data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
</script>

<template>
  <main>
    <div class="search">

    </div>
    <div class="product-list">
      <PhoneCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </main>
</template>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;

  margin: 2rem;
}
</style>
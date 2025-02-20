<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref(null);

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
  <p>{{ product }}</p>
</template>

<style scoped>

</style>

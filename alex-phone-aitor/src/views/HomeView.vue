<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PhoneCard from "@/components/PhoneCard.vue";

const route = useRoute();
const router = useRouter();

const products = ref([]);
const filters = ref({
  search: route.query.search || "",
  minPrice: route.query.minPrice || "",
  maxPrice: route.query.maxPrice || "",
  grade: route.query.grade || "",
  sort: route.query.sort || "price-asc", 
});

//Peticion API
onMounted(async () => {
  try {
    const response = await fetch("https://test.alexphone.com/api/v1/skus");
    const data = await response.json();
    products.value = data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

// Filtros
const filteredProducts = computed(() => {
  let result = [...products.value];

  // Filtrar por búsqueda
  if (filters.value.search) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(filters.value.search.toLowerCase())
    );
  }

  // Filtrar por precio mínimo
  if (filters.value.minPrice) {
    result = result.filter((p) => p.price >= parseFloat(filters.value.minPrice));
  }

  // Filtrar por precio máximo
  if (filters.value.maxPrice) {
    result = result.filter((p) => p.price <= parseFloat(filters.value.maxPrice));
  }

  // Filtrar por grado
  if (filters.value.grade) {
    result = result.filter((p) => p.grade === filters.value.grade);
  }

  // Ordenar
  if (filters.value.sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (filters.value.sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (filters.value.sort === "name-asc") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filters.value.sort === "name-desc") {
    result.sort((a, b) => b.name.localeCompare(a.name));
  }

  return result;
});

// Sincronizar filtros con la URL
watch(filters, (newFilters) => {
  router.replace({ query: { ...newFilters } });
}, { deep: true });


// Función para limpiar filtros
const clearFilters = () => {
  filters.value = {
    search: "",
    minPrice: "",
    maxPrice: "",
    grade: "",
    sort: "price-asc",
  };
  router.replace({ query: {} }); // Limpiar los parámetros de la URL
};
</script>

<template>
  <main>
    <div class="search">
      <input
        type="text"
        v-model="filters.search"
        placeholder="Buscar por nombre..."
      />

      <input
        type="number"
        v-model="filters.minPrice"
        placeholder="Precio mínimo"
      />
      <input
        type="number"
        v-model="filters.maxPrice"
        placeholder="Precio máximo"
      />

      <select v-model="filters.grade">
        <option value="">Todos los grados</option>
        <option value="excellent">Excellent</option>
        <option value="very_good">Very Good</option>
        <option value="good">Good</option>

      </select>

      <select v-model="filters.sort">
        <option value="price-asc">Precio: Bajo a Alto</option>
        <option value="price-desc">Precio: Alto a Bajo</option>
        <option value="name-asc">Nombre: A - Z</option>
        <option value="name-desc">Nombre: Z - A</option>
      </select>

      <button class="clear-btn" @click="clearFilters">Limpiar filtros</button>
    </div>

    <div class="product-list">
      <PhoneCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </main>
</template>

<style scoped>
main{
  margin: 2rem;
}

.search {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.search input,
.search select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.clear-btn {
  padding: 8px 12px;
  background-color: var(--color-principal);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.clear-btn:hover {
  background-color: var(--color-secundario);
}
</style>

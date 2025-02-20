<script setup>
import { useRouter } from "vue-router";

const props = defineProps(["product"]);
const router = useRouter();

const goToPhoneDetail = () => {
  router.push(`/phone/${props.product.sku}`);
};

</script>

<template>
  <div class="card" @click="goToPhoneDetail">
    <img :src="product.image" :alt="product.name" draggable="false"/>
    <div class="phone-detail">
      <h2>{{ product.name }}</h2>
      <p class="detail"><strong>Grade:</strong> {{ product.grade }}</p>
      <p class="detail"><strong>Color:</strong> {{ product.color }}</p>
      <p class="detail"><strong>Storage:</strong> {{ product.storage }}</p>
      <p class="price"><strong>${{ product.price }}</strong></p>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  width: 250px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;

  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}
.card img {
  width: 100%;
  height: 50%; 
  object-fit: contain;
  border-radius: 8px;
}


.phone-detail{
 text-align: left;
 padding: 0 1rem;
 height: 50%;

 display: flex;
 flex-direction: column; 
 justify-content: flex-start;
}

.price{
  margin-top: auto; 
}


.detail {
  font-size: 0.9rem;
  color: #555;
  margin: 4px 0;
}

.detail strong, .price strong{
  color: #333;
  font-weight: bold;
}

.card:hover{
  transform: scale(1.1);
}
</style>

<script setup>
import HeaderWeb from '../components/functions/HeaderWeb.vue'
import { ref } from 'vue'
import image1 from '../../assets/images/Not here to be Liked.jpg'
import image2 from '../../assets/images/Not here to be Liked.jpg'
import image3 from '../../assets/images/Not here to be Liked.jpg'

const showDetails = ref(false)

const invoice = {
  id: 'HD00123',
  user: 'Kenny',
  phone: '0789569444',
  address: '123 Parker Str, USA',
  total: '130$',
  createdDate: '27-10-2024',
  items: [
    { name: 'Not here to be Liked', quantity: 1, price: '50$', image: image1 },
    { name: 'Not here to be Liked', quantity: 1, price: '50$', image: image2 },
    { name: 'Not here to be Liked', quantity: 1, price: '50$', image: image3 }
  ]
}

function toggleDetails() {
  showDetails.value = !showDetails.value
}
</script>
<template>
  <header>
    <HeaderWeb />
  </header>
  <div class="purchase">
    <div class="list">
      <h2 class="text-center">Your purchase history</h2>
      <div class="card mb-3">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 class="card-title">Order ID: {{ invoice.id }}</h5>
            <p class="card-text">Name: {{ invoice.user }}</p>
            <p class="card-text">Phone: {{ invoice.phone }}</p>
            <p class="card-text">Address: {{ invoice.address }}</p>
            <p class="card-text">Total price: {{ invoice.total }}</p>
            <p class="card-text">Date of purchase: {{ invoice.createdDate }}</p>
          </div>
          <button class="btn btn-primary" @click="toggleDetails">Detail</button>
        </div>
        <div v-if="showDetails" class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Order detail</h6>
          <ul class="list-group">
            <li v-for="(item, index) in invoice.items" :key="index" class="list-group-item d-flex">
              <img :src="item.image" alt="product image" class="product-image" />
              <div class="details-info d-flex flex-column">
                <p class="mb-1">Name: {{ item.name }}</p>
                <p class="mb-1">Quantity: {{ item.quantity }}</p>
                <p class="mb-1">Price: {{ item.price }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 class="card-title">Order ID: {{ invoice.id }}</h5>
            <p class="card-text">Name: {{ invoice.user }}</p>
            <p class="card-text">Phone: {{ invoice.phone }}</p>
            <p class="card-text">Address: {{ invoice.address }}</p>
            <p class="card-text">Total price: {{ invoice.total }}</p>
            <p class="card-text">Date of purchase: {{ invoice.createdDate }}</p>
          </div>
          <button class="btn btn-primary" @click="toggleDetails">Detail</button>
        </div>
        <div v-if="showDetails" class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Order detail</h6>
          <ul class="list-group">
            <li v-for="(item, index) in invoice.items" :key="index" class="list-group-item d-flex">
              <img :src="item.image" alt="product image" class="product-image" />
              <div class="details-info d-flex flex-column">
                <p class="mb-1">Name: {{ item.name }}</p>
                <p class="mb-1">Quantity: {{ item.quantity }}</p>
                <p class="mb-1">Price: {{ item.price }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.purchase {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #fffbe9;
}

.list {
  padding-top: 5rem;
}

.card {
  max-width: 1200px;
  margin: auto;
}

.product-image {
  width: 60px;
  height: auto;
  margin-right: 10px;
}
</style>
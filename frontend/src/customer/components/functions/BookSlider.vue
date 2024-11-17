<script setup>
import { ref, onMounted } from 'vue';
import { productInformation } from '../../services/productService';

const product = ref([]);

const fetchProduct = async () => {
  try {
    const fetchProduct = await productInformation().getProduct();
    if (fetchProduct && fetchProduct.products) {
      product.value = fetchProduct.products.slice(0, 5);
    } else {
      console.log('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

onMounted(() => {
  fetchProduct();
});
</script>

<template>
  <div
    id="carousel"
    class="carousel slide"
    data-bs-ride="carousel"
    data-bs-interval="3000"
  >
    <div class="section-title">
      <h2>New Books</h2>
      <div class="line"></div>
    </div>
    <div class="carousel-indicators">
      <button
        v-for="(product, index) in product"
        :key="index"
        type="button"
        :data-bs-target="'#carousel'"
        :data-bs-slide-to="index"
        :class="{ active: index === 0 }"
        aria-label="'Slide ' + (index + 1)"
      ></button>
    </div>
    <div class="carousel-inner">
      <div
        v-for="(product, index) in product"
        :key="index"
        :class="['carousel-item', index === 0 ? 'active' : '']"
      >
        <div
          class="card mb-3"
          style="background-color: #e3caa5"
        >
          <div class="row g-0">
            <div class="col-md-4">
              <div class="img-wrapper">
                <img
                  :src="product.p_image"
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title">{{ product.p_name }}</h2>
                <h5 class="card-author">Author: {{ product.p_author }}</h5>
                <p class="card-text">{{ product.p_description }}</p>
                <router-link :to="`/bookpage/${product.p_id}`">
                  <button class="btn btn-primary">Information</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      id="btn-nav"
      type="button"
      data-bs-target="#carousel"
      data-bs-slide="prev"
    >
      <span
        class="carousel-control-prev-icon"
        aria-hidden="true"
      ></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      id="btn-nav"
      type="button"
      data-bs-target="#carousel"
      data-bs-slide="next"
    >
      <span
        class="carousel-control-next-icon"
        aria-hidden="true"
      ></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style scoped>
#carousel {
  background-color: #fffbe9;
  min-width: 100%;
  width: 100vw;
  margin: auto;
}

#carousel .section-title {
  padding-top: 20px;
  text-align: center;
}

#carousel .line {
  width: 150px;
  height: 2px;
  background: #ffd936;
  margin: 5px auto 20px;
}

.carousel-inner {
  padding: 1em 2em 3em;
}

.card {
  margin: 0 auto;
  max-width: 1280px;
}

.card .card-body {
  margin: 1rem 1.5rem 1rem 0.5rem;
  background-color: #fffbe9;
  border-radius: 5px;
}

.card-body .btn {
  color: black;
  border-radius: 10px;
  border: none;
  width: 150px;
  background-color: #e3caa5;
}

.card-body .btn:hover {
  color: black;
  background-color: #cab392;
}

.card .card-text {
  margin-top: 3rem;
  text-align: justify;
  max-height: 220px;
  overflow-y: auto;
  padding-right: 10px;
}

.img-wrapper {
  max-width: 100%;
  height: 30rem;
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.img-wrapper img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 5px;
  box-shadow: 0 1px 2px black;
  transition: all 0.3s ease-in-out;
}

.img-wrapper img:hover {
  transform: scale(1.03);
}

#btn-nav {
  background-color: black;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 2%;
}

.carousel-indicators button {
  background-color: black;
}

/* Small devices */
@media (max-width: 480px) {
}

/* Medium devices */
@media (max-width: 576px) {
}

/* Large devices */
@media (max-width: 768px) {
  .card .card-body {
    margin: 1rem 1.5rem 1rem;
  }
}
</style>

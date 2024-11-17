<script setup>
import { ref, onMounted } from 'vue';
import { productInformation } from '../../services/productService';

const product = ref({});

const fetchProduct = async () => {
  try {
    const fetchProduct = await productInformation().getProduct();
    if (fetchProduct && fetchProduct.products) {
      const randomProducts = getRandomItems(fetchProduct.products, 4);
      product.value = randomProducts;
      console.log('Random featured books:', product.value);
    } else {
      console.log('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

const getRandomItems = (array, n) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

onMounted(() => {
  fetchProduct();
});
</script>

<template>
  <nav id="featured-book">
    <div class="section-title">
      <h3>Featured Books</h3>
      <div class="line"></div>
    </div>
    <div class="row row-cols-1 row-cols-lg-4 row-cols-md-2 row-cols-sm-2 py-4">
      <div
        class="col d-flex justify-content-center mb-4"
        v-for="(product, index) in product"
        :key="index"
      >
        <router-link
          :to="`/bookpage/${product.p_id}`"
          class="card-link"
        >
          <div class="card">
            <img
              :src="product.p_image"
              class="card-img-top img-fluid"
              alt="..."
            />
            <div class="overlay">
              <h3 class="card-title">{{ product.p_name }}</h3>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#featured-book {
  background-color: #fffbe9;
  padding-bottom: 40px;
  width: 100%;
  height: 450px;
  overflow: hidden;
}

#featured-book .book {
  border-radius: 10px;
  margin: 20px auto;
  background-color: #e7dcc1;
}

#featured-book .section-title h3 {
  padding-top: 20px;
  text-align: center;
}

#featured-book .section-title .line {
  width: 150px;
  height: 2px;
  border: 10px;
  background: #ffd936;
  margin: auto;
}

.card-title {
  text-align: center;
  color: #fff;
  transform: translateY(20px);
  opacity: 0;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.card:hover .card-title {
  transform: translateY(0);
  opacity: 1;
}

.card-img-top {
  border-radius: 2px;
  width: 200px;
  height: 300px;
}

.card .overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  transition: 0.3s;
  opacity: 0;
  border-radius: 5px;
  z-index: 1;
}

.card:hover .overlay {
  opacity: 1;
}
</style>

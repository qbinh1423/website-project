<script setup>
import { ref, watchEffect } from 'vue';
import HeaderWeb from '../components/functions/HeaderWeb.vue';
import { useRoute } from 'vue-router';
import { getGenres } from '../services/categoryService';
import { productInformation } from '../services/productService';

const router = useRoute();

const category = ref(null);
const product = ref([]);

const fetchCategory = async (c_id) => {
  try {
    const fetchedCategory = await getGenres().getCategoryById(c_id);
    console.log('Fetched category:', fetchedCategory);

    if (fetchedCategory && fetchedCategory.category) {
      category.value = fetchedCategory.category;
      console.log('Category data:', category.value);
    } else {
      console.error('Category not found');
    }
  } catch (error) {
    console.error('Error fetching category:', error);
  }
};

const fetchProductByCategory = async (c_name) => {
  try {
    const fetchProduct = await productInformation().getProductbyCategory(c_name);
    console.log('Fetched product:', fetchProduct);

    if (fetchProduct) {
      product.value = fetchProduct.products;
      console.log('Product data:', product.value);
    } else {
      console.log('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

watchEffect(() => {
  const c_id = router.params.c_id;
  const c_name = router.params.c_name;
  console.log('Route parameters - c_id:', c_id, ', c_name:', c_name);

  if (c_id) fetchCategory(c_id);
  if (c_name) fetchProductByCategory(c_name);
});
</script>

<template>
  <div id="category">
    <nav class="navbar navbar-expand-lg fixed-top">
      <HeaderWeb />
    </nav>
    <section id="featured-book">
      <div class="container">
        <div class="section-title">
          <h1 v-if="category">{{ category.c_name }}</h1>
          <div class="line"></div>
        </div>
        <section id="saying">
          <div class="container">
            <img
              src="../../assets/images/quote.png"
              alt=""
            />
            <h2
              class="text-center"
              v-if="category"
            >
              {{ category.c_saying }}
            </h2>
            <p v-if="category">{{ category.c_author_saying }}</p>
          </div>
        </section>
        <div class="container py-5">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            <div
              class="col"
              v-for="product in product"
              :key="product.c_id"
            >
              <div class="card">
                <router-link :to="`/bookpage/${product.p_id}`">
                  <img
                    :src="product.p_image"
                    class="card-img-top"
                    alt="..."
                  />
                </router-link>
                <div class="card-body">
                  <h4 class="card-title">{{ product.p_name }}</h4>
                  <p class="card-text">{{ product.description }}</p>
                </div>
                <div class="d-flex justify-content-around mb-3">
                  <h5>${{ product.p_price }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
#category {
  position: absolute;
  left: 0;
  top: 0;
  overflow-x: hidden;
  background-color: #fffbe9;
  min-height: 100%;
  height: 100%;
}

#featured-book {
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin-top: 6rem;
}

.section-title h1 {
  font-size: 40px;
  text-align: center;
  margin-top: 20px;
}

.section-title .line {
  width: 150px;
  height: 4px;
  border: 10px;
  background: #ffd936;
  margin: auto;
}

#saying .container {
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 30px;
  border: #803d3b solid 1px;
  margin-top: 20px;
}

#saying .container img {
  width: 20px;
  height: 20px;
}

#saying p {
  font-size: 24px;
}

.card-img-top {
  border-radius: 30px;
  padding: 20px;
  height: 350px;
}

.card {
  height: 500px;
  border-radius: 30px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.card-body {
  padding: 25px;
  margin-top: -35px;
  overflow-y: auto;
}

.btn-primary,
.btn-success {
  border-radius: 10px;
  width: 80px;
}

.btn-primary:hover {
  background-color: black;
  border: 1px solid black;
}
</style>

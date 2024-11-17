<script setup>
import HeaderWeb from '../components/functions/HeaderWeb.vue';
import CartList from '../components/cart/CartList.vue';
import BillProduct from '../components/cart/BillList.vue';
import BillList from '../components/cart/BillList.vue';
</script>

<template>
  <header>
    <HeaderWeb />
  </header>
  <div class="cart container-fluid">
    <div class="row">
      <div class="col col-lg-7 col-md-7 col-sm-12 col-12">
        <CartList />
      </div>
      <div class="col col-lg-5 col-md-5 col-sm-12 col-12 mt-lg-0 mt-md-0 mt-sm-4 mt-4">
        <BillList />
      </div>
    </div>
  </div>
</template>
<style scoped>
.cart {
  margin: 3.8rem auto;
  background-color: #fffbe9;
  padding: 1.5rem;
  min-height: 100vh;
}
</style>

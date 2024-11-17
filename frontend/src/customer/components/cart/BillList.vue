<script setup>

</script>

<template>
  <div
    id="products"
    class="box"
  >
    <h3 class="p-3">Bill</h3>
    <div class="bill">
      <div class="row g-0">
        <div class="card">
          <div class="card-body">
            <div class="text-section">
              <p class="card-title">Harry Potter and the Philosopher's Stone</p>
              <p class="card-quantity mt-2">Quantity: 2</p>
              <p class="card-total">Total: $40</p>
            </div>
            <button class="btn btn-outline-danger ms-1">X</button>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="text-section">
              <p class="card-title">Harry Potter and the Philosopher's Stone</p>
              <p class="card-quantity">Quantity: 2</p>
              <p class="card-total">Total: $40</p>
            </div>
            <button class="btn btn-outline-danger ms-1">X</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="cart-total"
      style="background-color: white"
    >
      <h5 class="p-2">Total Price: $1000</h5>
      <button
        type="button"
        class="btn btn-primary w-100"
      >
        Checkout
      </button>
    </div>
  </div>
</template>

<style scoped>
#products {
  background-color: #e3caa5;
  min-height: 150px;
  border-radius: 15px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  overflow: hidden;
}

.card {
  max-width: 100%;
  flex-direction: row;
  border-radius: 0%;
  border: none;
}

.card img {
  max-width: 25%;
  max-height: 100px;
  margin: 15px auto;
  padding: 0.5rem;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.card-body {
  display: flex;
  justify-content: space-between;
}

.card-body .btn {
  max-height: 40px;
}

.text-section .card-title {
  font-weight: 600;
}

.card-body .btn {
  padding: 0.3rem 0.5rem;
}

.cart-total .btn {
  color: black;
  background-color: #e3caa5;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: none;
  font-size: 23px;
  font-weight: 600;
}
.cart-total .btn:hover {
  color: black;
  background-color: #e2c59b;
}

.quantity {
  height: 25px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ecdfcc;
  border-radius: 5px;
}

.quantity button {
  width: 25px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  background-color: #e3caa5;
}

.quantity button:hover {
  background-color: #bb724e;
}

.quantity span.num {
  font-size: 15px;
  pointer-events: none;
}
</style>
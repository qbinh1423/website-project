<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { userInformation } from '../services/userAccount';
import HeaderWeb from '../components/functions/HeaderWeb.vue';

const inputsDisabled = ref(true);
const router = useRoute();
const info = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
});

const id = ref(localStorage.getItem('u_id'));

// Lấy thông tin người dùng từ localStorage hoặc từ API
onMounted(() => {
  const storedUserString = localStorage.getItem('loggedInUser');
  const storedUser = storedUserString ? JSON.parse(storedUserString) : null;

  if (storedUser) {
    // Điền thông tin vào form từ dữ liệu đã lưu
    info.value.name = storedUser.u_name;
    info.value.phone = storedUser.u_phone;
    info.value.email = storedUser.u_email;
    info.value.address = storedUser.u_address;

    // Nếu có u_id từ router params, fetch dữ liệu người dùng
    const u_id = storedUser.u_id;
    if (u_id) {
      fetchUser(u_id);
    }
  }
});

async function fetchUser(id) {
  try {
    const user = await userInformation().getUser(id);
    console.log('Fetched user data:', user);
    info.value.name = user.u_name;
    info.value.phone = user.u_phone;
    info.value.email = user.u_email;
    info.value.address = user.u_address;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    alert('Failed to fetch user information');
  }
}

// Cập nhật thông tin người dùng khi form được gửi
async function onUpdateUser() {
  try {
    const response = await userInformation().updateUser(id.value, info.value);
    console.log('Account updated successfully:', response);
    alert('Profile updated successfully!');
  } catch (error) {
    console.error('Update failed:', error.message);
    alert('Update failed: ' + error.message);
  }
}

// Kích hoạt chế độ chỉnh sửa
const enableEdit = () => {
  inputsDisabled.value = false;
};
</script>

<template>
  <div>
    <header>
      <HeaderWeb />
    </header>
    <div class="form-container">
      <form @submit.prevent="onUpdateUser">
        <h3>User Information</h3>
        <div class="avt-container">
          <img
            src="../../assets/images/blank-profile-picture.png"
            id="photo"
          />
        </div>
        <label class="label">Name:</label>
        <input
          type="text"
          name="u_name"
          placeholder="Name"
          class="box"
          :disabled="inputsDisabled"
          v-model="info.name"
        />
        <label class="label">Phone:</label>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          required
          class="box"
          :disabled="inputsDisabled"
          v-model="info.phone"
        />
        <label class="label">Email:</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          class="box"
          :disabled="inputsDisabled"
          v-model="info.email"
        />
        <label class="label">Address:</label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          required
          class="box"
          :disabled="inputsDisabled"
          v-model="info.address"
        />
        <div class="row mt-2">
          <div class="change-edit col col-6">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="enableEdit"
            >
              Edit
            </button>
          </div>
          <div class="change-save col col-6">
            <button
              type="submit"
              class="btn btn-outline-success"
              name="save_customer"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Style của form */
.form-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  text-align: center;
  padding: 6rem;
  background-color: #fffbe9;
}

.form-container form {
  padding: 20px;
  width: 650px;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  background-color: white;
  text-align: center;
}

.form-container form h3 {
  font-size: 30px;
  margin-bottom: 10px;
  color: #000;
}

.form-container form .box {
  width: 600px;
  border-radius: 5px;
  background-color: #f0f0f0;
  padding: 10px 20px;
  font-size: 18px;
  border: 1px solid #000000;
  margin: 10px 0;
  opacity: 0.5;
}

.form-container button {
  width: 80px;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  margin: 0 50px;
}

.form-container form .box::placeholder {
  color: rgba(0, 0, 0, 0.5);
}

.form-container form .box:enabled::placeholder {
  color: black;
}

.form-container .label {
  display: flex;
  margin: 1rem 0.5rem 0;
}

.avt-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.avt-container #photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid black;
}

.avt-container #file {
  display: none;
}

.avt-container #uploadbtn {
  position: absolute;
  height: 30px;
  width: 30px;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
  transform: translateX(-90%);
  margin-top: 120px;
  margin-left: 170px;
  background-color: rgba(173, 172, 172, 0.8);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}

.error-message {
  color: red;
  display: block;
}
</style>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { loginService } from '../services/userAccount';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const queryClient = useQueryClient();
const router = useRouter();

const account = ref({
  u_email: '',
  u_password: ''
});
const message = ref('');

let validationSchema = toTypedSchema(
  z.object({
    u_email: z.string().email({ message: 'Please enter a valid email.' }),
    u_password: z.string().min(6, { message: 'Password must be at least 6 characters.' })
  })
);

const loginMutation = useMutation({
  mutationFn: async (user) => {
    const response = await loginService().loginAccount(user);
    return response;
  },
  onError: (error) => {
    console.error('Error message:', error.message);
    alert('Error: Invalid email or password');
  },
  onSuccess: (data) => {
    if (!data || !data.token) {
      console.error('Login data is missing token:', data);
      return;
    }
    message.value = 'User login successfully';
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('loggedInUser', JSON.stringify(data.user));
    queryClient.invalidateQueries({ queryKey: ['users'] });
    if (data.user.u_role === 0) {
      router.push({ name: 'home' });
    } else if (data.user.u_role === 1) {
      router.push({ name: 'dashboard' });
    }
  }
});

function login(values) {
  return loginMutation.mutate(values);
}
</script>
<template>
  <div id="login">
    <div class="form-container">
      <div class="row">
        <div class="col col-lg-2 col-md-4 col-sm-6 col-6">
          <h1>こんにちは</h1>
        </div>
        <div class="col col-lg-2 col-md-4 col-sm-6 col-6">
          <h1>Hola</h1>
        </div>
        <div class="col col-lg-2 col-md-4 col-sm-6 col-6">
          <h1>Hello</h1>
        </div>
        <div class="col col-lg-2 col-md-4 col-sm-6 col-6">
          <h1>Bonjour</h1>
        </div>
        <div class="col col-lg-2 col-md-4 col-sm-6 col-6">
          <h1>Xin Chao</h1>
        </div>
        <div class="col col-lg-2 col-md-4 col-sm-6 col-6">
          <h1>你好</h1>
        </div>
      </div>
      <p class="name">Book Store</p>
      <div
        class="container-sm pt-lg-5; rounded"
        id="input"
      >
        <Form
          :validation-schema="validationSchema"
          @submit="login"
          :initial-values="account"
        >
          <h2>LOGIN</h2>
          <div class="col-sm-10 col-10 mb-3 offset-1">
            <Field
              name="u_email"
              type="email"
              placeholder="Enter your email"
              :value="account.u_email"
              @input="account.u_email = $event"
              class="form-control"
            />
            <div style="text-align: left">
              <ErrorMessage
                name="u_email"
                class="text-danger"
              />
            </div>
          </div>
          <div class="col-sm-10 col-10 mb-3 offset-1">
            <Field
              type="password"
              name="u_password"
              placeholder="Enter your password"
              :value="account.u_password"
              @input="account.u_password = $event"
              class="form-control"
            />
            <div style="text-align: left">
              <ErrorMessage
                name="u_password"
                class="text-danger"
              />
            </div>
          </div>

          <div class="d-flex justify-content-center mt-3">
            <button
              type="submit"
              name="submit"
              class="btn-submit"
            >
              Login
            </button>
          </div>
          <p>No account? <router-link to="/register">Let's register</router-link></p>
        </Form>
      </div>
    </div>
  </div>
</template>
<style scoped>
#login {
  background-image: url('../../assets/images/contact.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  overflow-x: hidden;
  height: 100vh;
}

.row h1 {
  color: white;
  font-family: 'Dekko';
  font-size: 1.8rem;
  text-shadow: 1px 1px 2px black;
  text-align: center;
  width: 15rem;
  padding: 1rem;
}

.form-container .name {
  color: #fffdd7;
  font-size: 7rem;
  font-family: 'Kaushan Script';
  text-shadow: 1px 1px 2px black;
  text-align: center;
}

.form-container .slogan {
  color: white;
  font-size: 2rem;
  font-family: 'Junge';
  text-shadow: 1px 1px 2px black;
  text-align: center;
  margin-top: -2rem;
}

#input {
  border: 2px solid black;
  margin: 0px auto 10px;
  padding: 20px;
  width: 26rem;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
}

#input .form-control {
  border-radius: 0.5rem;
  background-color: #f0f0f0;
  padding: 1rem;
  font-size: 1rem;
  color: #000;
}

.form-container form h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #000;
  text-align: center;
}

.form-container form p {
  padding-top: 1.5rem;
  font-size: 1rem;
  color: #000;
  text-align: center;
}

.form-container form p a {
  color: blue;
}

.form-container form p a:hover {
  text-decoration: underline;
  color: red;
}

.btn-submit {
  background-color: #f5cf84;
  color: #000;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-submit:hover {
  background-color: #eeb748;
  color: #fff;
}
</style>

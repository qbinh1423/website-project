<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { registerService } from '../services/userAccount';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const queryClient = useQueryClient();
const message = ref(null);
const router = useRouter();

const account = ref({
  u_name: '',
  u_email: '',
  u_address: '',
  u_phone: '',
  u_password: ''
});

let validationSchema = toTypedSchema(
  z.object({
    u_name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters.' })
      .max(50, { message: 'Name must be at most 50 characters.' }),
    u_address: z.string().max(500, { message: 'Address must be at most 500 characters.' }),
    u_phone: z.string().regex(/^(0[35789]\d{8}|01[2689]\d{7})$/, {
      message: 'It must be 10 digits and start with 0.'
    }),
    u_email: z.string().email({ message: 'Please enter a valid email.' }),
    u_password: z.string().min(6, { message: 'Password must be at least 6 characters.' })
  })
);

const registerMutation = useMutation({
  mutationFn: async (user) => {
    const response = await registerService().registerAccount(user);
    return response;
  },
  onError: (error) => {
    console.error('Error during registration:', error.message);
    const confirmError = confirm(error.message);
    if (confirmError) {
      window.loggedIn = null;
    }
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    const confirmSuccess = confirm('User registered successfully! Please login again.');
    if (confirmSuccess) {
      window.loggedIn = null;
      router.push({ name: 'login' });
    }
  }
});

function register(values) {
  message.value = null;
  return registerMutation.mutate(values);
}
</script>

<template>
  <div id="register">
    <div class="form-container container rounded">
      <Form
        :validation-schema="validationSchema"
        @submit="register"
        :initial-values="account"
      >
        <h2>REGISTER</h2>
        <div class="col-sm-10 col-10 mb-3 offset-1">
          <Field
            name="u_name"
            placeholder="Enter your name"
            :value="account.u_name"
            @input="account.u_name = $event"
            class="form-control"
          />
          <div style="text-align: left">
            <ErrorMessage
              name="u_name"
              class="text-danger"
            />
          </div>
        </div>

        <div class="col-sm-10 col-10 mb-3 offset-1">
          <Field
            name="u_address"
            placeholder="Enter your address"
            :value="account.u_address"
            @input="account.u_address = $event"
            class="form-control"
          />
          <div style="text-align: left">
            <ErrorMessage
              name="u_address"
              class="text-danger"
            />
          </div>
        </div>

        <div class="col-sm-10 col-10 mb-3 offset-1">
          <Field
            name="u_phone"
            placeholder="Enter your phone"
            :value="account.u_phone"
            @input="account.u_phone = $event"
            class="form-control"
          />
          <div style="text-align: left">
            <ErrorMessage
              name="u_phone"
              class="text-danger"
            />
          </div>
        </div>

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
            class="btn-register"
          >
            Register
          </button>
        </div>
        <p>Already have an account? <router-link to="/">Let's login</router-link></p>
      </Form>
    </div>
  </div>
</template>

<style scoped>
#register {
  background-image: url('../../assets/images/contact.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  overflow-x: hidden;
  height: 100vh;
}

.form-container {
  margin: 50px auto;
  padding: 10px;
  width: 30rem;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  background-color: rgba(255, 255, 255, 0.7);
  text-align: center;
}

.form-container h2 {
  font-size: 2rem;
  margin: 1rem 0 1.5rem;
  color: #000;
  text-align: center;
}

.form-container .form-control {
  border-radius: 0.5rem;
  background-color: #f0f0f0;
  padding: 1rem;
  font-size: 1rem;
  color: #000;
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

.btn-register {
  background-color: #f5cf84;
  color: #000;
  font-size: 1 rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-register:hover {
  background-color: #eeb748;
  color: #fff;
}
</style>

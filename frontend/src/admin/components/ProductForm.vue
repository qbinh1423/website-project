<script setup>
import { ref, useTemplateRef } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const props = defineProps({
  product: { type: Object, required: true }
});

let imageFileInput = useTemplateRef('image-file-input');
let imageFile = ref(props.product.p_image);
const $emit = defineEmits(['submit:product', 'delete:product']);

let validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    author: z.string().min(1, { message: 'Author name is required.' }),
    publish_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date is required.' }),
    description: z.string().max(2000, { message: 'Description is at most 2000 characters.' }),
    category: z.string().min(1, { message: 'At most 1 category.' }),
    price: z.string().min(1, { message: 'Price is required.' }),
    quantity: z.string().min(1, { message: 'Quantity is required.' }),
    imageFile: z.instanceof(File).optional()
  })
);

const PublishDate = props.product.p_publish_date
  ? new Date(props.product.p_publish_date).toISOString().split('T')[0]
  : '';

function previewImageFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (evt) => {
    imageFile.value = evt.target.result;
    imageChanged.value = true;
  };
  reader.readAsDataURL(file);
}

function submitProduct(values) {
  let productData = {};
  for (let key in values) {
    if (values[key] !== undefined) {
      productData[key] = values[key];
    }
  }
  console.log('Formdata: ', productData);
  $emit('submit:product', productData);
}
</script>

<template>
  <section class="add-products">
    <Form
      :validation-schema="validationSchema"
      @submit="submitProduct"
    >
      <div class="mb-3">
        <label
          for="name"
          class="form-label"
          >Product name:</label
        >
        <Field
          name="name"
          type="text"
          class="box"
          :value="product.p_name"
        />
        <ErrorMessage
          name="name"
          class="error-feedback"
        />
      </div>

      <div class="mb-3">
        <label
          for="author"
          class="form-label"
          >Author:</label
        >
        <Field
          name="author"
          type="text"
          class="box"
          :value="product.p_author"
        />
        <ErrorMessage
          name="author"
          class="error-feedback"
        />
      </div>

      <div class="mb-3">
        <label
          for="publish_date"
          class="form-label"
          >Publish date (YYYY-MM-DD):</label
        >
        <Field
          name="publish_date"
          type="text"
          class="box"
          :value="PublishDate"
        />
        <ErrorMessage
          name="publish_date"
          class="error-feedback"
        />
      </div>

      <div class="mb-3">
        <label
          for="description"
          class="form-label"
          >Description:</label
        >
        <Field
          name="description"
          type="text"
          class="box"
          :value="product.p_description"
        />
        <ErrorMessage
          name="description"
          class="error-feedback"
        />
      </div>

      <div class="mb-3">
        <label
          for="category"
          class="form-label"
          >Category:</label
        >
        <Field
          name="category"
          type="text"
          class="box"
          :value="product.c_id"
        />
        <ErrorMessage
          name="category"
          class="error-feedback"
        />
      </div>

      <div class="mb-3">
        <label
          for="price"
          class="form-label"
          >Price:</label
        >
        <Field
          name="price"
          type="text"
          class="box"
          :value="product.p_price"
        />
        <ErrorMessage
          name="price"
          class="error-feedback"
        />
      </div>

      <div class="mb-3">
        <label
          for="quantity"
          class="form-label"
          >Quantity:</label
        >
        <Field
          name="quantity"
          type="text"
          class="box"
          :value="product.p_quantity"
        />
        <ErrorMessage
          name="quantity"
          class="error-feedback"
        />
      </div>
      <div class="mb-3">
        <Field
          name="imageFile"
          v-slot="{ handleChange }"
        >
          <input
            type="file"
            class="d-none"
            ref="image-file-input"
            @change="
              (event) => {
                handleChange(event);
                previewImageFile(event);
              }
            "
            accept="image/jpg,image/jpeg,image/png"
          />
        </Field>
        <ErrorMessage
          name="imageFile"
          class="error-feedback"
        />
        <button
          type="button"
          class="btn btn-file mt-2"
          @click="imageFileInput.click()"
        >
          <i class="fas fa-upload"></i> Add Image
        </button>
        <div v-if="imageFile">
          <img
            class="img-fluid mt-2"
            :src="imageFile"
            alt="Selected Image"
          />
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-save mt-2"
      >
        Save
      </button>
    </Form>
  </section>
</template>

<style scoped>
.add-products {
  background-color: #fffbe9;
  display: flex;
  flex-direction: column;
  margin-top: -1rem;
}

.add-products form {
  background-color: #f5d4ad;
  border-radius: 0.5rem;
  padding: 2rem 2rem 1rem 2rem;
  text-align: left;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  max-width: 32rem;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
}

.add-products form label {
  font-size: 16px;
}

.add-products form .box {
  display: flex;
  width: 400px;
  background-color: #fff5e0;
  border-radius: 10px;
  border: none;
  margin: 0.2rem 0 0.6rem;
  padding: 0.8rem;
  color: #000000;
  font-size: 18px;
  box-shadow: inset 2px 4px 6px rgba(0, 0, 0, 0.2);
}

.add-products form .box:focus {
  border: none;
  outline: none;
  background-color: #fff5e0;
}

.add-products form .error-feedback {
  color: red;
}

.add-products .btn-save {
  border-radius: 10px;
  width: 150px;
  background-color: #fff5e0;
}

.add-products .btn-save:hover {
  background-color: #cab392;
}

.add-products .btn-file {
  background-color: #fff5e0;
  border-radius: 10px;
}

.add-products img {
  width: 400px;
  height: 500px;
  border-radius: 5px;
}
</style>

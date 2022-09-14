<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
const email = ref("");
const password = ref("");
function submit() {
  console.log("email: ", email.value);
  console.log("password: ", typeof password.value, password.value);
  axios
    .post("/api/auth/login", {
      email: email.value,
      password: password.value,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
</script>

<template>
  <main>
    <input v-model="email" type="email" id="email" required />
    <input
      v-model="password"
      type="password"
      name="password"
      id="password"
      required
    />
    <button @click="submit">login</button>
  </main>
</template>

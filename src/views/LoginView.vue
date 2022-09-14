<script setup lang="ts">
import { login } from "@/api/user";
import { ref } from "vue";
const email = ref("");
const password = ref("");
function submit() {
  console.log("email: ", email.value);
  console.log("password: ", password.value);
  login({ email: email.value, password: password.value })
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

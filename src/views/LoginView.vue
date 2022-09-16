<script setup lang="ts">
import router from "@/router";
import { login } from "@/api/user";
import { setLocalStorage } from "@/utils/auth";
import { ref } from "vue";
const email = ref("");
const password = ref("");
function submit() {
  console.log("email: ", email.value);
  console.log("password: ", password.value);
  login({ email: email.value, password: password.value })
    .then(function (res) {
      console.log(res);
      if (res.data.error_code > 0) {
        console.log(res.data.message);
      } else {
        let data = res.data.data;
        setLocalStorage("token_type", data.token_type);
        setLocalStorage("access_token", data.access_token);
        router.push("/home");
      }
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

<script setup lang="ts">
import router from "@/router";
import { login } from "@/api/user";
import { setLocalStorage } from "@/utils/auth";
import { reactive } from "vue";
import type { FormRules } from "element-plus";

const form = reactive({
  email: "yangqixiang2001@163.com",
  password: "200",
});

const rules = reactive<FormRules>({
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { min: 3, max: 5, message: "邮箱格式不对", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const onSubmit = () => {
  login({ email: form.email, password: form.password })
    .then(function (res) {
      if (res.data.error_code > 0) {
        console.log(res.data.message);
      } else {
        let data = res.data.data;
        console.log(data);
        setLocalStorage("token_type", data.token_type);
        setLocalStorage("access_token", data.access_token);
        router.push("/createBatch");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
</script>

<template>
  <main>
    <el-form :model="form" label-width="120px" :rules="rules">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">login</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

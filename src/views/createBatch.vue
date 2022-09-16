<script setup lang="ts">
import { reactive } from "vue";
import { createBatch } from "@/api/batch";
const form = reactive({
  name: "",
});

const onSubmit = () => {
  console.log(form);

  createBatch({
    name: form.name,
  })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    });
};
</script>

<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="批次名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped></style>

<script setup lang="ts">
import Menu from "@/components/menu.vue";
import router from "@/router";
const loginOut=()=>{
  router.push("/login");
}
</script>
<template>
  <el-container>
    <el-header
      ><img src="@/assets/logo.jpg" />
      <el-button type="primary" @click="loginOut">登出</el-button></el-header
    >
    <el-container>
      <el-aside width="200px">
        <Menu></Menu>
      </el-aside>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.el-container {
  width: 100vw;
  header {
    background-color: #222;
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>

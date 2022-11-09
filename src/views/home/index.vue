<script setup lang="ts">
import { judgeLogin, logout } from "@/api/user";
import Menu from "@/components/menu.vue";
import router from "@/router";
import { onMounted } from "vue";
const handleLogout = async () => {
  const { error } = await logout();
  if (!error) {
    router.push("/login");
  }
};
onMounted(async () => {
  const { data,error } = await judgeLogin();
  console.log(data)
  console.log(error)
  if (error) {
    router.push("/login");
  }
});
</script>
<template>
  <el-container>
    <el-header
      ><img src="@/assets/logo1.svg" />
      <el-button type="primary" @click="handleLogout">登出</el-button></el-header
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
  height: 100vh;
  header {
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    img {
      width: 250px;
      height: 60px;
    }
  }
}
</style>

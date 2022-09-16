<script setup lang="ts">
import Menu from "@/components/menu.vue";
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <Menu></Menu>
        </el-aside>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped></style>

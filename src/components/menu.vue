<script lang="ts" setup>
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-sub-menu index="1">
      <template #title>
        <span>招新管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/batchList">批次管理</el-menu-item>
        <el-menu-item index="/editPosition">编辑岗位</el-menu-item>
        <el-menu-item index="/jobsList">岗位列表</el-menu-item>
        <el-menu-item index="/studentList">学生管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

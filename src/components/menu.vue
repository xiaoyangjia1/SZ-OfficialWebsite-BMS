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
        <span>岗位管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/createBatch">创建批次</el-menu-item>
        <el-menu-item index="/editPosition">编辑岗位</el-menu-item>
        <el-menu-item index="/jobsList">岗位列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <span>学生管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/studentList">学生列表</el-menu-item>
        <el-menu-item index="/evaluate">评定成绩</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

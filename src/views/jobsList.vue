<script setup lang="ts">
import { getJobs } from "@/api/position";
import { reactive } from "vue";

interface Position {
  it: number;
  status: number;
  title: string;
  batch: string;
  category: string;
  deadline: string;
  apply_number: number;
}
let tableData: Position[] = reactive([]);
getJobs()
  .then(function (res) {
    let data = res.data.data;
    data.forEach((el:any) => {
      tableData.push({
        id: el.id,
        status: el.status,
        title: el.title,
        batch: el.batch,
        category: el.category,
        deadline: el.deadline,
        apply_number: el.apply_number,
      });
    });
  })
  .catch(function (error) {
    console.log(error);
  });
</script>

<template>
  <el-table
    :data="tableData"
    :default-sort="{ prop: 'date', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column prop="id" label="id" sortable width="180" />
    <el-table-column prop="deadline" label="deadline" sortable width="180" />
    <el-table-column prop="title" label="title" width="180" />
    <el-table-column prop="batch" label="batch" />
    <el-table-column prop="category" label="category" width="180" />
    <el-table-column
      prop="apply_number"
      label="apply_number"
      sortable
      width="180"
    />
    <el-table-column prop="status" label="status" sortable width="180" />
  </el-table>
</template>
<style scoped></style>

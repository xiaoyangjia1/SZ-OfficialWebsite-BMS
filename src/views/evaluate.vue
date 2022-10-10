<script setup lang="ts">
import { getJobs } from "@/api/position";
import { reactive } from "@vue/reactivity";

interface Position {
  ID: number;
  Status: number;
  Title: string;
  Batch: string;
  Category: string;
  Deadline: string;
  Apply_number: number;
}
let tableData: Position[] = reactive([]);
getJobs()
  .then(function (res) {
    let data = res.data.data;
    data.forEach((el) => {
      tableData.push({
        ID: el.ID,
        Status: el.Status,
        Title: el.Title,
        Batch: el.Batch,
        Category: el.Category,
        Deadline: el.Deadline,
        Apply_number: el.Apply_number,
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
    <el-table-column prop="ID" label="ID" sortable width="180" />
    <el-table-column prop="Deadline" label="Deadline" sortable width="180" />
    <el-table-column prop="Title" label="Title" width="180" />
    <el-table-column prop="Batch" label="Batch" />
    <el-table-column prop="Category" label="Category" width="180" />
    <el-table-column
      prop="Apply_number"
      label="Apply_number"
      sortable
      width="180"
    />
    <el-table-column prop="Status" label="Status" sortable width="180" />
  </el-table>
</template>
<style scoped></style>

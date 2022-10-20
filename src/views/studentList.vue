<script setup lang="ts">
import { getResume } from "@/api/resume";
import { getDeliveredInfo } from "@/api/progress";
import { reactive } from "vue";
import { ref } from "vue";
import { formatDate } from "@/utils/date";
import { getAllBatch } from "@/api/batch";
import { getAllCategory } from "@/api/category";

interface Position {
  resume: string;
  name: string;
  title: string;
  batch: string;
  category: string;
  deliverTime: string;
}
interface Filter_item {
  text: string;
  value: string;
}
let filterBatchList: Filter_item[] = reactive([]);
getAllBatch()
  .then((res: any) => {
    res.data.data.forEach((el: any) => {
      filterBatchList.push({
        text: el.name,
        value: el.name,
      });
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
let filterCategoryList: Filter_item[] = reactive([]);
getAllCategory()
  .then((res: any) => {
    console.log(res.data.data);
    res.data.data.forEach((el: any) => {
      if (el.pid > 0) {
        filterCategoryList.push({
          text: el.name,
          value: el.name,
        });
      }
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
const filterBatch = (value: string, row: any) => {
  return row.batch === value;
};
const filterCategory = (value: string, row: any) => {
  return row.category === value;
};
let tableData: Position[] = reactive([]);
const dialogVisible = ref(false);
let resume = ref("");
function viewResume(row: any) {
  getResume(row.resume)
    .then((res: any) => {
      resume.value = JSON.stringify(res.data.data);
    })
    .catch((error: any) => {
      console.log(error);
    });
  dialogVisible.value = true;
}
const handleClose = () => {
  dialogVisible.value = false;
};
getDeliveredInfo()
  .then((res) => {
    res.data.data.forEach((el: any) => {
      tableData.push({
        name: el.name,
        batch: el.batch,
        category: el.category,
        title: el.title,
        deliverTime: formatDate(el.created_at),
        resume: el.email,
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
</script>

<template>
  <el-table
    :data="tableData"
    :default-sort="{ prop: 'date', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column type="index" width="50" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column
      prop="batch"
      label="批次"
      :filters="filterBatchList"
      :filter-method="filterBatch"
    />
    <el-table-column
      prop="category"
      label="类别"
      :filters="filterCategoryList"
      :filter-method="filterCategory"
    />
    <el-table-column prop="title" label="岗位" width="180" />
    <el-table-column prop="deliverTime" label="投递时间" sortable />
    <el-table-column prop="resume" label="简历" width="120">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="viewResume(scope.row)"
          >查看简历</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <el-input v-model="resume" type="textarea" />
  </el-dialog>
</template>
<style scoped></style>

<script setup lang="ts">
import { getResume } from "@/api/resume";
import { getDeliveredInfo } from "@/api/progress";
import { getAllBatch } from "@/api/batch";
import { getAllCategory } from "@/api/category";
import { formatDate } from "@/utils/date";
import { onBeforeMount, reactive } from "vue";
import { ref } from "vue";
import { computed } from "@vue/reactivity";
import Steps from "@/components/steps.vue";
import type { Progress } from "@/type/progress";
import { downloadPDF } from "@/utils/pdf";

interface Position {
  pid: string;
  email: string;
  name: string;
  title: string;
  batch: string;
  category: string;
  test: number;
  interview: number;
  check1: number;
  check2: number;
  offer: number;
  created_at: string;
}
interface Filter_item {
  text: string;
  value: string;
}
interface Category {
  id: number;
  name: string;
  pid: number;
}
const batchList: { value: Filter_item[] } = reactive({
  value: [],
});
const categoryList: { value: Filter_item[] } = reactive({
  value: [],
});
const tableData: { value: Position[] } = reactive({ value: [] });
const searchName = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    (el: Position) => !searchName.value || el.name.includes(searchName.value)
  )
);
const dialogVisible = ref(false);
const resume = ref("");
onBeforeMount(() => {
  getAllBatchAPICall();
  getAllCategoryAPICall();
  getDeliveredInfoAPICall();
});

const getAllBatchAPICall = async () => {
  const { data, error } = await getAllBatch();
  if (!error) {
    batchList.value = data.map((el: any) => {
      return {
        text: el.name,
        value: el.name,
      };
    });
  }
};
const getAllCategoryAPICall = async () => {
  const { data, error } = await getAllCategory();
  if (!error) {
    categoryList.value = data
      .filter((el: Category) => {
        return el.pid > 0;
      })
      .map((el: Category) => {
        return {
          text: el.name,
          value: el.name,
        };
      });
  }
};
const getDeliveredInfoAPICall = async () => {
  const { data, error } = await getDeliveredInfo();
  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
  tableData.value = (data as Progress[]).map((el: Progress) => {
    const {
      pid,
      email,
      name,
      batch,
      category,
      title,
      test,
      interview,
      check1,
      check2,
      offer,
      created_at,
    } = el;
    const progress = "nihao";
    return {
      pid,
      email,
      name,
      batch,
      category,
      title,
      created_at: formatDate(created_at),
      test,
      interview,
      check1,
      check2,
      offer,
    };
  });
};
const handleFilter = (value: string, row: Position, column: any) => {
  const property: keyof Position = column.property;
  return row[property] === value;
};
const handleViewResume = async (row: Position) => {
  const { data, error } = await getResume(row.email);
  if (!error) {
    resume.value = JSON.stringify(data);
    dialogVisible.value = true;
  }
};
const handleDownloadResume = () => {
  console.log(111)
  downloadPDF("resume-item")
};
const handleClose = () => {
  dialogVisible.value = false;
};
</script>

<template>
  <el-table
    :data="filterTableData"
    :default-sort="{ prop: 'date', order: 'descending' }"
  >
    <el-table-column type="expand">
      <template #default="props">
        <Steps
          :row="{
            pid: props.row.pid,
            email: props.row.email,
            test: props.row.test,
            interview: props.row.interview,
            check1: props.row.check1,
            check2: props.row.check2,
            offer: props.row.offer,
          }"
        />
        <Files
          :row="{
            batch: props.row.batch,
            title: props.row.title,
            email: props.row.email,
          }"
        />
      </template>
    </el-table-column>
    <el-table-column type="index" />
    <el-table-column prop="name" label="姓名">
      <template #header>
        <el-input v-model="searchName" size="small" placeholder="搜索名字" />
      </template>
    </el-table-column>
    <el-table-column
      prop="batch"
      label="批次"
      :filters="batchList.value"
      :filter-method="handleFilter"
    />
    <el-table-column
      prop="category"
      label="类别"
      :filters="categoryList.value"
      :filter-method="handleFilter"
    />
    <el-table-column prop="title" label="岗位" />
    <el-table-column prop="created_at" label="投递时间" sortable />
    <el-table-column prop="resume" label="简历">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="handleViewResume(scope.row)"
          >查看简历</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="dialogVisible"
    title="简历"
    width="30%"
    :before-close="handleClose"
  >
    <el-input id="resume-item" v-model="resume" type="textarea" />
    <el-button @click="handleDownloadResume">下载简历</el-button>
  </el-dialog>
</template>
<style scoped></style>

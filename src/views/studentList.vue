<script setup lang="ts">
import { getResume } from "@/api/resume";
import { getDeliveredInfo, submitEpicycleResult } from "@/api/progress";
import { getAllBatch } from "@/api/batch";
import { getAllCategory } from "@/api/category";
import { formatDate } from "@/utils/date";
import { onBeforeMount, onMounted, reactive } from "vue";
import { ref } from "vue";
import { computed } from "@vue/reactivity";

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
interface DeliveredInfo extends Position {
  readonly id: number;
  readonly files1: string;
  readonly files2: string;
  readonly link1: string;
  readonly link2: string;
  readonly updated_at: string;
}
interface TableItem extends Position {
  progress: string;
  step: number;
  steps: string[];
  epicycle: string;
  status: string;
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
const tableData: { value: TableItem[] } = reactive({ value: [] });
const searchName = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    (el: TableItem) => !searchName.value || el.name.includes(searchName.value)
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

  tableData.value = data.map((el: DeliveredInfo) => {
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
    const { step, status, epicycle, progress } = judgeStep([
      test,
      interview,
      check1,
      check2,
    ]);
    const steps = [];
    if (test) {
      steps.push("笔试");
    }
    if (interview) {
      steps.push("面试");
    }
    if (check1) {
      steps.push("一轮考核");
    }
    if (check2) {
      steps.push("二轮考核");
    }
    steps.push("Offer");
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
      progress,
      step,
      steps,
      epicycle,
      status,
    };
  });
};
const judgeStep = (stepArr: number[]) => {
  let step = 0,
    status = "process",
    progress = "",
    epicycle = "";
  for (let i = 0; i < 4; i++) {
    if (stepArr[i] === 1) {
      if (i === 0) {
        epicycle = "test";
      } else if (i === 1) {
        epicycle = "interview";
      } else if (i === 2) {
        epicycle = "check1";
      } else {
        epicycle = "check2";
      }
      status = "process";
      progress =
        i === 0 ? "笔试" : i === 1 ? "面试" : i === 2 ? "一轮考核" : "二轮考核";
      break;
    }
    if (stepArr[i] === 2) {
      progress = "录用中";
      step++;
      if (i === 3) {
        epicycle = "offer";
        progress = "已录用";
      }
    }
    if (stepArr[i] === 3) {
      status = "error";
      progress = "已结束";
      break;
    }
  }
  return { step, status, progress, epicycle };
};
const handleFilter = (value: string, row: TableItem, column: any) => {
  const property: keyof TableItem = column.property;
  return row[property] === value;
};
const handleViewResume = async (row: TableItem) => {
  const { data, error } = await getResume(row.email);
  resume.value = JSON.stringify(data);
  dialogVisible.value = true;
};
const handleClose = () => {
  dialogVisible.value = false;
};
const handleNext = async (row: TableItem, result: number) => {
  if (result === 2) {
    row.step++;
  } else {
    row.status = "error";
  }
  const { email, pid, epicycle } = row;
  const { data, error } = await submitEpicycleResult({
    email,
    pid,
    epicycle,
    result,
  });
};
</script>

<template>
  <el-table
    :data="filterTableData"
    :default-sort="{ prop: 'date', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column type="expand">
      <template #default="props">
        <el-steps
          :active="props.row.step"
          :process-status="props.row.status"
          finish-status="success"
        >
          <el-step
            v-for="(step, index) in props.row.steps"
            :title="step"
            :key="index"
          />
        </el-steps>
        <el-button
          type="success"
          :disabled="props.row.status === 'error'"
          style="margin-top: 12px"
          @click="handleNext(props.row, 2)"
          >通过</el-button
        >
        <el-button
          type="danger"
          :disabled="props.row.status === 'error'"
          style="margin-top: 12px"
          @click="handleNext(props.row, 3)"
          >未通过</el-button
        >
      </template>
    </el-table-column>
    <el-table-column type="index" width="50" />
    <el-table-column prop="name" label="姓名" width="180">
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
    <el-table-column prop="title" label="岗位" width="180" />
    <el-table-column prop="created_at" label="投递时间" sortable />
    <el-table-column prop="progress" label="流程" />
    <el-table-column prop="resume" label="简历" width="120">
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
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <el-input v-model="resume" type="textarea" />
  </el-dialog>
</template>
<style scoped></style>

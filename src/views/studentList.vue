<script setup lang="ts">
import { getResume } from "@/api/resume";
import { getDeliveredInfo } from "@/api/progress";
import { reactive } from "vue";
import { ref } from "vue";
import { formatDate } from "@/utils/date";
import { getAllBatch } from "@/api/batch";
import { getAllCategory } from "@/api/category";
import { computed } from "@vue/reactivity";

interface Position {
  resume: string;
  name: string;
  title: string;
  batch: string;
  category: string;
  deliverTime: string;
  test: number;
  interview: number;
  check1: number;
  check2: number;
  progress: string;
  step: number;
  status: string;
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
const judgeStep = (stepArr: number[]) => {
  let step = 0,
    status = "process",
    progress = "";
  for (let i = 0; i < 4; i++) {
    if (stepArr[i] === 1) {
      status = "process";
      progress =
        i === 0 ? "笔试" : i === 1 ? "面试" : i === 2 ? "一轮考核" : "二轮考核";
      break;
    }
    if (stepArr[i] === 2) {
      progress = "录用";
      step++;
    }
    if (stepArr[i] === 3) {
      status = "error";
      progress = "已结束";
      break;
    }
  }
  return { step, status, progress };
};
getDeliveredInfo()
  .then((res) => {
    res.data.data.forEach((el: any) => {
      const { name, batch, category, title, test, interview, check1, check2 } =
        el;
      const { step, status, progress } = judgeStep([
        test,
        interview,
        check1,
        check2,
      ]);
      tableData.push({
        name,
        batch,
        category,
        title,
        deliverTime: formatDate(el.created_at),
        resume: el.email,
        test,
        interview,
        check1,
        check2,
        progress,
        step,
        status,
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
  const searchName = ref('')
  const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !searchName.value ||
      data.name.includes(searchName.value)
  )
)
const active = ref(0);
const next = () => {
  if (active.value++ > 2) active.value = 0;
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
          <el-step v-if="props.row.test" title="笔试" />
          <el-step v-if="props.row.interview" title="面试" />
          <el-step v-if="props.row.check1" title="一轮考核" />
          <el-step v-if="props.row.check2" title="二轮考核" />
          <el-step title="Offer" />
        </el-steps>
        <el-button type="success" :disabled="props.row.status==='error'" style="margin-top: 12px" @click="next">通过</el-button>
        <el-button type="danger" :disabled="props.row.status==='error'" style="margin-top: 12px" @click="next">未通过</el-button>
      </template>
    </el-table-column>
    <el-table-column type="index" width="50" />
    <el-table-column prop="name" label="姓名" width="180" >
      <template #header>
        <el-input v-model="searchName" size="small" placeholder="搜索名字" />
      </template> 
    </el-table-column>
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
    <el-table-column prop="progress" label="流程" />
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

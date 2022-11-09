<script lang="ts" setup>
import { submitEpicycleResult } from "@/api/progress";
import { ElMessage } from "element-plus";
import { computed, reactive } from "vue";
const props = defineProps<{
  row: {
    pid: string;
    email: string;
    test: number;
    interview: number;
    check1: number;
    check2: number;
    offer: number;
  };
}>();
const { row } = props;
const { pid, email, test, interview, check1, check2, offer } = row;
const steps = ({
  value: [],
} = reactive({ value: [test, interview, check1, check2, offer] }));
const activeIndex = computed(() => {
  let res = 0;
  for (let i = 0; i < 4; i++) {
    if (steps.value[i] === 1) {
      break;
    }
    res++;
  }
  return res;
});
const activeStep = computed(() => {
  let step = 0;
  for (let i = 0; i < 4; i++) {
    if (steps.value[i] === 1) {
      break;
    }
    if (steps.value[i] === 2) {
      step++;
    }
  }
  return step;
});
const status = computed(() => {
  for (let i = 0; i <= 4; i++) {
    if (steps.value[i] === 3) {
      return "error";
    }
    if (steps.value[i] === 2 && i === 4) {
      return "success";
    }
  }
  return "process";
});
const epicycle_ = computed(() => {
  return activeIndex.value === 0
    ? "test"
    : activeIndex.value === 1
    ? "interview"
    : activeIndex.value === 2
    ? "check1"
    : activeIndex.value === 3
    ? "check2"
    : "Offer";
});
const handleNext = async (result: number) => {
  const epicycle = epicycle_.value;
  const { error } = await submitEpicycleResult({
    email,
    pid,
    epicycle,
    result,
  });
  if (!error) {
    steps.value[activeIndex.value] = result;
    ElMessage.success({
      message: "进度更新成功.",
    });
  } else {
    ElMessage.error({
      message: "进度更新失败.",
    });
  }
};
</script>
<template>
  <el-steps
    :active="activeStep"
    :process-status="status"
    finish-status="success"
    align-center
  >
    <el-step v-if="steps.value[0]" title="笔试" />
    <el-step v-if="steps.value[1]" title="面试" />
    <el-step v-if="steps.value[2]" title="一轮考核" />
    <el-step v-if="steps.value[3]" title="二轮考核" />
    <el-step title="Offer" />
  </el-steps>
  <el-button
    type="success"
    :disabled="status === 'error' || status === 'success'"
    style="margin-top: 12px"
    @click="handleNext(2)"
    >通过</el-button
  >
  <el-button
    type="danger"
    :disabled="status === 'error' || status === 'success'"
    style="margin-top: 12px"
    @click="handleNext(3)"
    >未通过</el-button
  >
</template>

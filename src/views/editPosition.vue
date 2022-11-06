<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { getPosition, postJob, updataJobInfo } from "@/api/position";
import { getAllBatch } from "@/api/batch";
import { useRoute, useRouter } from "vue-router";
import { getAllCategory } from "@/api/category";
import { ElMessage } from "element-plus";

interface Options_item {
  label: string;
  options: Options_childItem[];
}
interface Options_childItem {
  value: string;
  label: string;
}
interface BatchItem {
  value: string;
  label: string;
}
interface Position {
  title: string;
  batch: string;
  category: string;
  deadline: string;
  test: number;
  interview: number;
  check1: number;
  check2: number;
  desc: string;
  requirements: string;
  [key: string]: string | number;
}
const options: { value: Options_item[] } = reactive({ value: [] });
const batchList: { value: BatchItem[] } = reactive({ value: [] });
const form: Position = reactive({
  title: "",
  batch: "",
  deadline: "",
  category: "",
  test: 0,
  interview: 0,
  check1: 0,
  check2: 0,
  desc: "",
  requirements: "",
});
const route = useRoute();
const router = useRouter();
const { pid } = route.params;
onBeforeMount(() => {
  getAllBatchAPICall();
  getAllCategoryAPICall();
  getPositionAPICall();
});
const getAllCategoryAPICall = async () => {
  const { data, error } = await getAllCategory();
  data.forEach((el: any) => {
    if (el.pid === 0) {
      options.value.push({
        label: el.name,
        options: [],
      });
    } else {
      options.value[el.pid - 1].options.push({
        value: el.name,
        label: el.name,
      });
    }
  });
};
const getAllBatchAPICall = async () => {
  const { data, error } = await getAllBatch();
  batchList.value = data.map((el: any) => {
    return {
      value: el.name,
      label: el.name,
    };
  });
};
const getPositionAPICall = async () => {
  if (pid) {
    const { data, error } = await getPosition(pid as string);
    for (let key in form) {
      form[key] = data[key];
    }
  }
};
const onSubmit = async () => {
  const deadline =
    typeof form.deadline === "string"
      ? Date.parse(form.deadline) / 1000
      : Number(form.deadline) / 1000;
  if (pid) {
    const { error } = await updataJobInfo({
      pid: pid as string,
      ...form,
      deadline,
    });
    if (!error) {
      ElMessage.success({
        message: "岗位信息更新成功.",
        duration: 1000,
        onClose: () => {
          router.push("/jobsList");
        },
      });
    } else {
      ElMessage.error({
        message: "岗位信息更新失败.",
      });
    }
  } else {
    const { error } = await postJob({ ...form, deadline });
    if (!error) {
      ElMessage.success({
        message: "岗位发布成功.",
        duration: 1000,
        onClose: () => {
          console.log("1111111");
          router.push("/jobsList");
        },
      });
    } else {
      ElMessage.error({
        message: "岗位发布失败.",
      });
    }
  }
};
</script>

<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="标题">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="招新项目">
      <el-select v-model="form.batch" placeholder="选择招新项目">
        <el-option
          v-for="item in batchList.value"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="职位类别">
      <el-select v-model="form.category" placeholder="选择职位类别">
        <el-option-group
          v-for="group in options.value"
          :key="group.label"
          :label="group.label"
        >
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-option-group>
      </el-select>
    </el-form-item>
    <el-form-item label="截止时间">
      <el-date-picker
        v-model="form.deadline"
        type="datetime"
        placeholder="Pick a Date"
        format="YYYY/MM/DD hh:mm:ss"
        value-format="x"
      />
    </el-form-item>
    <el-form-item label="流程">
      <el-checkbox
        v-model="form.test"
        label="笔试"
        :true-label="1"
        :false-label="0"
      />
      <el-checkbox
        v-model="form.interview"
        label="面试"
        :true-label="1"
        :false-label="0"
      />
      <el-checkbox
        v-model="form.check1"
        label="一轮考核"
        :true-label="1"
        :false-label="0"
      />
      <el-checkbox
        v-model="form.check2"
        label="二轮考核"
        :true-label="1"
        :false-label="0"
      />
    </el-form-item>
    <el-form-item label="职位描述">
      <el-input
        v-model="form.desc"
        type="textarea"
        rows="10"
        maxlength="300"
        show-word-limit
      />
    </el-form-item>
    <el-form-item label="职位要求">
      <el-input
        v-model="form.requirements"
        type="textarea"
        rows="10"
        maxlength="300"
        show-word-limit
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{
        pid ? "更新岗位信息" : "发布岗位"
      }}</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped lang="scss">
.el-form {
  max-width: 700px;
}
</style>

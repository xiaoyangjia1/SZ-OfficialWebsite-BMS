<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { getPositionByID, postJob, updataJobInfo } from "@/api/position";
import { getAllBatch } from "@/api/batch";
import { useRoute } from "vue-router";

const options = [
  {
    label: "研发",
    options: [
      {
        value: "前端",
        label: "前端",
      },
      {
        value: "后端",
        label: "后端",
      },
      {
        value: "客户端",
        label: "客户端",
      },
      {
        value: "数据挖掘",
        label: "数据挖掘",
      },
    ],
  },
  {
    label: "设计",
    options: [
      {
        value: "交互设计",
        label: "交互设计",
      },
    ],
  },
];
const form = reactive({
  title: "",
  batch: "",
  deadline: "",
  category: "",
  test: 0,
  interview: 1,
  check1: 1,
  check2: 0,
  type: [],
  desc: "",
  requirements: "",
});
const route = useRoute();
const onSubmit = () => {
  const deadline =
    typeof form.deadline === "string"
      ? Date.parse(form.deadline) / 1000
      : Number(form.deadline) / 1000;
  const formData = {
    title: form.title,
    batch: form.batch,
    category: form.category,
    deadline,
    test: form.test,
    interview: form.interview,
    check1: form.check1,
    check2: form.check2,
    desc: form.desc,
    requirements: form.requirements,
  };
  if (route.params.pid) {
    updataJobInfo({ pid: route.params.pid as string, ...formData })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  } else {
    postJob(formData)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

interface BatchItem {
  value: string;
  label: string;
}
const batchList: BatchItem[] = reactive([]);
onBeforeMount(() => {
  if (route.params.pid) {
    getPositionByID(route.params.pid as string)
      .then((res: any) => {
        const data = res.data.data;
        Object.assign(form, data);
        console.log(form);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  getAllBatch()
    .then((res: any) => {
      let data = res.data.data;
      data.forEach((el: any) => {
        const batch_item = {
          value: el.name,
          label: el.name,
        };
        batchList.push(batch_item);
      });
    })
    .catch((err: any) => {
      console.log(err);
    });
});
</script>

<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="标题">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="招聘项目">
      <el-select v-model="form.batch" placeholder="please select your zone">
        <el-option
          v-for="item in batchList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="职位类别">
      <el-select v-model="form.category" placeholder="please select your zone">
        <el-option-group
          v-for="group in options"
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
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item label="职位要求">
      <el-input v-model="form.requirements" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">发布</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped></style>

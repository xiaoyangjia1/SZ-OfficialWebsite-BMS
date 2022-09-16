<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="标题">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="招聘项目">
      <el-select v-model="form.batch" placeholder="please select your zone">
        <el-option label="2022寒假招新" value="shanghai" />
        <el-option label="2023寒假招新" value="beijing" />
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
      <el-col :span="11">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="form.time"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </el-col>
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
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { postJob } from "@/api/position";
const category = ref("");
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
  date: "",
  time: "",
  category: "前端",
  test: 0,
  interview: 1,
  check1: 1,
  check2: 0,
  type: [],
  desc: "",
  requirements: "",
});

const onSubmit = () => {
  console.log(form);

    postJob({
      title: form.title,
      batch: form.batch,
      category: form.category,
      deadline: Date.parse(form.date) / 1000,
      test: form.test,
      interview: form.interview,
      check1: form.check1,
      check2: form.check2,
      desc: form.desc,
      requirements: form.requirements,
    })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
};
</script>

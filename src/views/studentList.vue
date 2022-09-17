<script setup lang="ts">
import { getResumeById } from "@/api/resume";
import { getDeliveredInfo } from "@/api/progress";
import { reactive } from "@vue/reactivity";
import { ref } from "vue";
import { stringify } from "querystring";

interface Position {
  ID: number;
  Sid: string;
  Pid: string;
  Resume: string;
  //     Name: number;
  //   Batch: string;
  //   Category: string;
  //   deliverTime: string;
  //   progress: string;
  //   status: number;
}
let tableData: Position[] = reactive([]);
const dialogVisible = ref(false);
let resume=ref('')
function viewResume(row) {

  getResumeById(row.Resume)
    .then((res) => {
      resume.value=JSON.stringify(res.data.data)
    })
    .catch((error) => {
      console.log(error);
    });
    dialogVisible.value=true
}
const handleClose=()=>{
    dialogVisible.value=false
}
getDeliveredInfo()
  .then((res) => {
    let data = res.data.data;
    data.forEach((el) => {
      tableData.push({
        ID: el.ID,
        Sid: el.Sid,
        Pid: el.Pid,
        Resume: el.Sid,
      });
    });
    console.log(res.data.data);
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
    <el-table-column prop="ID" label="ID" sortable width="180" />
    <el-table-column prop="Sid" label="Sid" width="180" />
    <el-table-column prop="Pid" label="Pid" width="180" />
    <el-table-column label="Resume" width="120">
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
    <!-- <el-table-column prop="Resume" label="Resume" width="180" /> -->
    <!-- <el-table-column prop="Name" label="Name" width="180" />
    <el-table-column prop="Batch" label="Batch" />
    <el-table-column prop="Category" label="Category" width="180" />
    <el-table-column
      prop="DeliverTime"
      label="DeliverTime"
      sortable
      width="180"
    />
    <el-table-column prop="Progress" label="Progress" />
    <el-table-column prop="Status" label="Status" width="180" /> -->
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

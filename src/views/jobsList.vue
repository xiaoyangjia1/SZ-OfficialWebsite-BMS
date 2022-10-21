<script setup lang="ts">
import { getJobs, deleteJob, changeJobStatus } from "@/api/position";
import { formatDate } from "@/utils/date";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
interface Position {
  pid: number;
  status: number;
  title: string;
  batch: string;
  category: string;
  deadline: string;
  apply_number: number;
  btnText: string;
}
let tableData: { value: Position[] } = reactive({ value: [] });
onMounted(async () => {
  const { data, error } = await getJobs();
  tableData.value = data.map(
    ({ pid, status, title, batch, category, deadline, apply_number }: any) => {
      return {
        pid,
        status,
        title,
        batch,
        category,
        deadline: formatDate(deadline),
        apply_number,
        btnText: status === 1 ? "撤销" : "恢复",
      };
    }
  );
});
const handleStatus = (index: any, row: any) => {
  changeJobStatus(row.pid)
    .then((res: any) => {
      tableData.value[index].status =
        tableData.value[index].status === 1 ? 0 : 1;
      tableData.value[index].btnText =
        tableData.value[index].status === 1 ? "撤销" : "恢复";
    })
    .catch((err: any) => {
      console.log(err);
    });
};
const handleEdit = (index: any, row: any) => {
  router.push("/editPosition/" + row.pid);
};
const handleDelete = (index: any, row: any) => {
  deleteJob(row.pid)
    .then((res: any) => {
      tableData.value.splice(index, 1);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
</script>

<template>
  <el-table
    :data="tableData.value"
    :default-sort="{ prop: 'date', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column prop="pid" label="pid" sortable width="180" />
    <el-table-column prop="deadline" label="截止日期" sortable width="180" />
    <el-table-column prop="title" label="标题" width="180" />
    <el-table-column prop="batch" label="批次" />
    <el-table-column prop="category" label="类别" width="180" />
    <el-table-column
      prop="apply_number"
      label="投递人数"
      sortable
      width="180"
    />
    <el-table-column prop="status" label="状态" sortable width="180" />
    <el-table-column prop="operation" label="操作" sortable width="180">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          link
          type="primary"
          size="small"
          @click="handleStatus(scope.$index, scope.row)"
        >
          {{ scope.row.btnText }}
        </el-button>
        <el-button
          link
          type="primary"
          size="small"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<style scoped lang="scss"></style>

<script setup lang="ts">
import { getJobs, deleteJob, changeJobStatus } from "@/api/position";
import { formatDate } from "@/utils/date";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

interface Position {
  pid: number;
  status: number;
  title: string;
  batch: string;
  category: string;
  deadline: string;
  apply_number: number;
}
let tableData: { value: Position[] } = reactive({ value: [] });
const deleteDialogVisible = ref(false);
const deletePid = ref("");
const router = useRouter();
const handleGetJobs = async () => {
  const { data, error } = await getJobs();
  if (!error) {
    tableData.value = data.map(
      ({
        pid,
        status,
        title,
        batch,
        category,
        deadline,
        apply_number,
      }: any) => {
        return {
          pid,
          status,
          title,
          batch,
          category,
          deadline: formatDate(deadline),
          apply_number,
        };
      }
    );
  }
};
onMounted(() => {
  handleGetJobs();
});
const handleStatus = async (index: any, row: any) => {
  const { error } = await changeJobStatus(row.pid);
  if (!error) {
    tableData.value[index].status ^= 1;
  }
};
const handleEdit = (pid: string) => {
  router.push("/editPosition/" + pid);
};
const handleDelete = async (pid: string) => {
  const { error } = await deleteJob(pid);
  if (!error) {
    ElMessage.success({
      message: "删除成功.",
      duration: 1000,
    });
    handleGetJobs();
  } else {
    ElMessage.error({
      message: "删除失败.",
      duration: 1000,
    });
  }
  deleteDialogVisible.value = false;
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
    <el-table-column prop="status" label="状态" sortable width="180">
      <template #default="scope">
        <el-tag
          class="ml-2"
          :type="`${scope.row.status === 1 ? 'success' : 'info'}`"
          >{{ scope.row.status === 1 ? "运行" : "下架" }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="operation" label="操作" sortable width="180">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="handleEdit(scope.row.pid)"
          >编辑</el-button
        >
        <el-button
          link
          type="primary"
          size="small"
          @click="handleStatus(scope.$index, scope.row)"
        >
          {{ scope.row.status === 1 ? "撤销" : "恢复" }}
        </el-button>
        <el-button
          link
          type="primary"
          size="small"
          @click="
            () => {
              deleteDialogVisible = true;
              deletePid = scope.row.pid;
            }
          "
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="deleteDialogVisible" title="删除岗位">
    <span>请确认该岗位所有投递同学的流程都已走完，不然会删除失败！</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDelete(deletePid)">
          已确认,删除岗位
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>

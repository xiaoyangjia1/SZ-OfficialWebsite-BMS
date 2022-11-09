<script setup lang="ts">
import { createBatch, getAllBatch, deleteBatch } from "@/api/batch";
import { changeJobStatus } from "@/api/position";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const dialogFormVisible = ref(false);
const deleteDialogVisible = ref(false);
const deleteBatchName = ref("");
interface Position {
  batch: string;
  apply_number: number;
  status: number;
}
let tableData: { value: Position[] } = reactive({ value: [] });
const form = reactive({
  name: "",
});
const handleGetAllBatch = async () => {
  const { data } = await getAllBatch();
  tableData.value = data.map(({ name }: any) => {
    return {
      batch: name,
      apply_number: 0,
      status: 1,
    };
  });
};
onMounted(() => {
  handleGetAllBatch();
});
const handleStatus = (index: any, row: any) => {
  changeJobStatus(row.pid)
    .then((res: any) => {
      tableData.value[index].status =
        tableData.value[index].status === 1 ? 0 : 1;
    })
    .catch((err: any) => {
      console.log(err);
    });
};
const handleEdit = (index: any, row: any) => {
  router.push("/editPosition/" + row.pid);
};
const handleDelete = async (name: string) => {
  const { error } = await deleteBatch({ name });
  if (!error) {
    ElMessage.success({
      message: "删除成功.",
    });
    handleGetAllBatch();
  } else {
    ElMessage.error({
      message: "删除失败.",
    });
  }
  deleteDialogVisible.value = false
};
const onCreateBatch = async () => {
  const { error } = await createBatch({
    name: form.name,
  });
  if (!error) {
    ElMessage.success({
      message: "创建成功.",
    });
    handleGetAllBatch();
  }else {
    ElMessage.error({
      message: "创建失败.",
    });
  }
  dialogFormVisible.value = false;
};
</script>

<template>
  <el-table
    :data="tableData.value"
    :default-sort="{ prop: 'date', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column prop="batch" label="批次名称" />
    <el-table-column
      prop="apply_number"
      label="投递人数"
      sortable
    />
    <el-table-column prop="status" label="状态" >
      <template #default="scope">
        <el-tag
          class="ml-2"
          :type="`${scope.row.status === 1 ? 'success' : 'info'}`"
          >{{ scope.row.status === 1 ? "运行" : "下架" }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="operation" label="操作">
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
          {{ scope.row.status === 1 ? "撤销" : "恢复" }}
        </el-button>
        <el-button
          link
          type="primary"
          size="small"
          @click="
            () => {
              deleteDialogVisible = true;
              deleteBatchName = scope.row.batch;
            }
          "
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="dialogFormVisible = true"
    >创建批次</el-button
  >
  <el-dialog v-model="dialogFormVisible" title="创建批次">
    <el-form :model="form">
      <el-form-item label="批次标题">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onCreateBatch"> 创建 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="deleteDialogVisible" title="删除批次">
    <span>删除前请确认该批次所有岗位的流程都已走完，不然会删除失败！</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDelete(deleteBatchName)">
          已确认,删除批次
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>

<script lang="ts" setup>
import { getUploadedFile } from "@/api/files";
import { onBeforeMount, ref } from "vue";

const props = defineProps<{
  row: {
    batch: string;
    title: string;
    email: number;
  };
}>();
const { row } = props;
const { batch, title, email } = row;
const filesData = ref([]);
const handleGetUploadedFile = async () => {
  const { data, error } = await getUploadedFile({
    batch,
    title,
    email,
  });
  if (!error) {
    filesData.value = data.map((el: string) => {
      return {
        name: el,
        url: `http://47.115.228.82:81/api/downloadFile?batch=${batch}&title=${title}&email=${email}&name=${el}`,
      };
    });
  }
};

onBeforeMount(() => {
  handleGetUploadedFile();
});
</script>
<template>
  <h3>文件列表</h3>
  <el-table :data="filesData">
    <el-table-column label="文件名" prop="name" />
    <el-table-column label="操作" prop="download">
      <template #default="scope">
        <a :href="scope.row.url">下载文件</a>
      </template>
    </el-table-column>
  </el-table>
</template>

<template>
  <el-timeline-item :timestamp="`${task.time[0]} - ${task.time[1]}`" placement="top" :color="status== 'running' ? 'running' : status== 'finish' ? 'finish' : ''" :type="status== 'running' ? 'primary' : status== 'finish' ? 'success' : ''" :hollow="status== 'running'">
    <el-card :class="[status== 'running' ? 'running' : status== 'finish' ? 'finish' : '', 'card']">
      <el-row justify="space-around" align="center">
        <el-col :span="18" style="display: flex; align-items:center">
          <el-icon v-if="status== 'running'" class="is-loading" style="margin-right:10px">
            <Loading />
          </el-icon>
          <h4>{{task.text}}</h4>
        </el-col>
        <el-col :span="6" style="display: flex; align-items:center; justify-content:center; min-width:30px">
          <el-link class="del" :size="20" @click="deleteTask(task)" :icon="Close"></el-link>
          <el-button v-if="status =='wait'" @click="change">开始任务</el-button>
          <el-button v-if="status== 'running'" type="primary" @click="change">
            完成</el-button>
          <el-button v-if="status== 'finish'" type="success" :icon="Check" circle disabled />
        </el-col>
      </el-row>
    </el-card>
  </el-timeline-item>
</template>

<script setup>
import { Loading, Check, Close } from '@element-plus/icons-vue'
import { ref } from 'vue'
import store from '@/util/store'
// import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps({ task: Object })
const emit = defineEmits(['refresh'])

const task = ref(props.task)
const status = ref(task.value.status)
const change = () => {
  if (status.value == 'wait') {
    status.value = 'running'
  } else if (status.value == 'running') {
    status.value = 'finish'
    store.finishTask(task.value.id);
  }
}
const deleteTask = (task) => {
  ElMessageBox.confirm('确认要删除这个任务吗？', '确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      store.delTask(task.id);
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      emit('refresh')
    })
    .catch(() => {})
}
</script>
<style scoped>
.del {
  display: none;
  position: absolute;
  top: -10px;
  right: -10px;
}
.card:hover {
  background: #ecf5ff39;
}
.card:hover .del {
  display: inline;
}
.running {
  background: #ecf5ff;
}
.finish {
  background: #f0f9eb;
}
</style>

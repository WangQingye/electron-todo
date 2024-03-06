<template>
  <el-timeline style="padding-left: 0px">
    <taskItem v-for="task in tasks" :key="task.text" :task="task" @refresh="refresh">
    </taskItem>
  </el-timeline>
  <el-empty v-if="tasks.length == 0" description="还没有任何任务，赶快去添加吧！" />
  <el-button type="primary" style="float:right" @click="showAdd" link>添加任务</el-button>
  <el-dialog v-model="dialogFormVisible" title="添加任务" width="400">
    <el-form :model="form" ref="formRef">
      <el-form-item label="任务名称" prop="text" :rules="[
        {
          required: true,
          message: '请填写任务名称',
          trigger: 'blur',
        },
      ]">
        <el-input v-model="form.text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="时间范围" prop="time" :rules="[
        {
          required: true,
          message: '请选择任务时间段',
          trigger: 'blur',
        },
      ]">
        <el-config-provider :locale="locale">
          <el-time-picker v-model="form.time" is-range range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间" format="HH:mm" value-format="HH:mm" />
        </el-config-provider>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addTask">
          添加
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import taskItem from './TaskItem.vue'
import { ref, onMounted, reactive } from 'vue'
import store from '@/util/store'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// dialogFormVisible
// form
// addTask
const locale = zhCn
const dialogFormVisible = ref(false)
const form = reactive({
  text: '',
  time: [],
})
const formRef = ref()

const showAdd = () => {
  dialogFormVisible.value = true;
  setTimeout(() => {
    formRef.value.resetFields();
  },100)
}
const addTask = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      store.addTask({...form, status: 'wait'});
      dialogFormVisible.value = false;
      ElMessage({
        type: 'success',
        message: '添加成功',
      })
      refresh()
    }
  })
}
// [{
//   time: '09:30-10:00',
//   text: '整理简历'
// },{
//   time: '10:00-10:30',
//   text: '投简历'
// },{
//   time: '10:30-11:30',
//   text: '看书'
// },{
//   time: '14:00-15:30',
//   text: '学React'
// },{
//   time: '15:30-17:00',
//   text: '看面试题'
// },{
//   time: '17:00-18:00',
//   text: '研究tradingView'
// }]
const tasks = ref([])
onMounted(() => {
  refresh()
})
const refresh = () => {
  tasks.value = store.getTaskList();
  console.log(tasks.value);
}
</script>
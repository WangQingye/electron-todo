<template>
  <el-tabs type="border-card" v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="今日任务" name="today">
      <Content />
    </el-tab-pane>
  </el-tabs>
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script setup>
import Card from './components/TaskItem.vue'
import Content from './components/Content.vue'

const activeName = "today"

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 10px;
  min-width: 300px;
}
.el-timeline-item__wrapper {
  padding-left: 20px;
}
</style>

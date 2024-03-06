const taskKey = 'ELECTRON_TASK_LIST'
const finishKey = 'ELECTRON_TASK_LIST_FINISH'
export default {
  setList(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
  },
  getList(key) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify([]));
      return [];
    } else {
      return JSON.parse(localStorage.getItem(key));
    }
  },
  getFinishList() {
    let finishRecord = this.getList(finishKey);
    // 每次取的时候把之前对不上的删掉
    let list = finishRecord.filter(r => new Date(r.finishTime).getDay() == new Date().getDay());
    this.setList(finishKey, list);
    return list
  },
  getTaskList() {
    let taskList = this.getList(taskKey);
    console.log(taskList);
    let finishRecord = this.getFinishList();
    taskList.forEach(t => {
      // 如果是已完成的任务，修改任务状态
      let f = finishRecord.find(r => r.id == t.id);
      if (f) {
        t.status = 'finish';
      }
    })
    console.log(taskList);
    taskList.sort((a, b) => {
      let start1 = a.time[0];
      let start2 = b.time[0];
      return new Date(`2000-01-01 ${start1}`) - new Date(`2000-01-01 ${start2}`)
    })
    return taskList;
  },
  finishTask(id) {
    let finishRecord = this.getFinishList();
    finishRecord.push({
      id,
      finishTime: new Date().getTime(),
    });
    this.setList(finishKey, finishRecord);
  },
  addTask(task) {
    let taskList = this.getTaskList();
    task.id = new Date().getTime();
    taskList.push(task)
    this.setList(taskKey, taskList);
  },
  delTask(id) {
    let taskList = this.getTaskList();
    let list = taskList.filter(task => task.id != id)
    this.setList(taskKey, list);
  }
}
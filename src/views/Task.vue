<template>
  <div class="task">
    <div class="task__inner">
      <div class="task__title">Task</div>
      <input type="text" v-model="task" class="task__input" />
      <button
        @click="dataShow"
        class="md-button md-raised md-primary btn-second md-theme-default"
      >
        ADD TASK
      </button>
      <!-- <div v-for="(task, tIndex) of tasksGet" :key="tIndex" class="task__block">
        {{ tIndex + 1 }} {{ task.task }}
        <md-checkbox v-model="array" :value="tIndex + 1">Done</md-checkbox>
      </div> -->
      <!-- <div style="display:none">{{ b }}</div> -->
    </div>
  </div>
</template>

<script lang="ts">
// import { Component, Vue } from "vue-property-decorator";

// class TaskC {
//   public task: string;
//   public boolean?: boolean[];
//   constructor(task, boolean) {
//     this.task = task;
//     this.boolean = boolean;
//   }
// }

// @Component({
//   data() {
//     return {
//       task: "",
//       array: [],
//       tasks: [],
//     };
//   },
// })
// export default class Task extends Vue {
//   private task!: string;
//   private array?: boolean[];
//   public tasks!: TaskC[];

//   dataShow(): void {
//     this.tasks.push(new TaskC(this.task, this.array));
//     // this.tasks.
//   }

//   public b(index): boolean {
//     this.tasks.forEach((t) => {
//       t.boolean!.find((n) => {
//         console.log("n", n);

//         if (n == index) return true;
//         else {
//           return false;
//         }
//       });
//     });
//     return true;
//   }

//   public get tasksGet(): TaskC[] {
//     console.log("tasks", this.tasks);

//     return this.tasks;
//   }
// }
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  justify-content: center;
  &__input {
    padding: 3px 10px;
    width: 350px;
    height: 30px;
    border: 1px solid black;
    border-radius: 7px;
    font-size: 15px;
  }
  &__title {
    font-size: 20px;
  }
  &__inner {
    display: flex;
    flex-direction: column;
  }
  &__block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
  }
}
</style>

<template>
  <v-row style="display: flex; justify-content: space-between">
    <v-btn style="background: none;" elevation="0" @click="changeFilter">
      <v-icon icon="fa:fas fa-filter"></v-icon>
    </v-btn>
    <router-link
      class="add_button"
      to="/addTask"
    >
      <v-icon icon="fa:fas fa-plus"></v-icon>
    </router-link>
  </v-row>
  <v-row v-if="isFilter">
    <v-card
      position="absolute"
      style="z-index: 1"
      width="100%"
    >
      <p>Фильтрация задач</p>
      <v-card-text>
        <v-text-field v-if="selectedDateFilter !== 'Без даты'" type="date" v-model="selectedDate" class="input_date"/>
        <v-select
          v-if="selectedDate"
          v-model="selectedDateFilter"
          :items="optionsDateFilter"
          label="Фильтрация для даты"
          class="mb-4 input_filter"
        />
        <v-select
          v-model="selectedExecutor"
          :items="Array.from(new Set(getTasks.map(task => task.executor)))"
          label="Исполнитель"
          class="mb-4 input_filter"
        />
        <v-select
          v-model="selectedTaskType"
          :items="getTypesTasks"
          label="Тип задачи"
          class="mb-4 input_filter"
        />
        <v-btn style="text-transform: capitalize" color="blue-grey-darken-2" @click="ClearFilter">
          Отменить
        </v-btn>
      </v-card-text>
    </v-card>
  </v-row>
  <v-row>
    <v-col
      class="block_category"
      :key="category.id"
      v-for="category in getCategories"
      @drop="onDrop($event, category.id)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div style="width: 100%; display: flex; justify-content: space-around; align-items: flex-start">
        <v-text-field
          v-model="category.title"
          v-if="category.isEditColumn"
        />
        <p v-else>{{ category.title }}</p>
        <v-btn @click="category.isEditColumn = !category.isEditColumn">
          <v-icon icon="fa:fas fa-edit"></v-icon>
        </v-btn>
      </div>
      <my-card
        :key="task.id"
        v-for="task in filteredTasks.filter(task => task.columnId === category.id)"
        :task-data="task"
        @openModal="handlerClick"
        @changeStatus="changeStatus"
        @dragstart="onDragStart($event, task)"
        draggable="true"
      />
    </v-col>
  </v-row>
  <v-dialog
    v-model="isModal"
  >
    <v-card>
      <v-card-actions>
        <v-btn @click="isModal=false">X</v-btn>
      </v-card-actions>
      <v-card-text>
        <my-form
          :formDataProps="taskEdit"
          :validForm="isFormValid"
          :submitHandlerProps="submitHandler"
          text="Редактировать"
          title-form="Редактирование задачи"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import myCard from "@/components/UI/MyCard.vue";
import MyForm from "@/components/MyForm.vue";
import {dateFromString} from "@/helpers/dateFromString";

export default {
  name: 'show-task',
  data() {
    return {
      isModal: false,
      taskEdit: {
        id: '',
        type: '',
        description: '',
        department: '',
        executor: '',
        dateEnd: new Date(),
        dateStart: new Date(),
        amountTime: '',
        isDone: false,
      },
      tasks: [],
      forFilterTask: [],
      optionsDateFilter: [
        "Равно",
        "Больше",
        "Меньше",
        "Без даты"
      ],
      isFilter: false,
      selectedExecutor: '',
      selectedTaskType: '',
      selectedDateFilter: '',
      selectedDate: '',
      isFormValid: true
    }
  },
  methods: {
    ...mapMutations(["changeTask", "changeTasks"]),
    handlerClick(itemId) {
      this.changeTask(itemId);
      this.taskEdit = this.getTaskById;
      this.isModal = true;
    },
    changeFilter() {
      this.isFilter = !this.isFilter;
    },
    changeStatus(itemId) {
      this.changeTask(itemId);
      this.taskEdit = this.getTaskById;
      this.taskEdit.isDone = true;
    },
    submitHandler() {
      this.isModal = false;
    },
    ClearFilter() {
      this.selectedDate = '';
      this.selectedDateFilter = '';
      this.selectedTaskType = '';
      this.selectedExecutor = '';
    },
    onDragStart(e, item) {
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('itemId', item.id.toString());
    },
    onDrop(e, columnId) {
      const itemId = e.dataTransfer.getData('itemId');
      this.tasks = this.getTasks.map(x => {
        if (x.id == itemId) {
          x.columnId = columnId;
          return x;
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getTasks', "getTaskById", "getCategories", "getTypesTasks"]),
    filteredByExecutor() {
      if (!this.selectedExecutor) {
        return this.forFilterTask;
      }
      return this.forFilterTask.filter(task => task.executor === this.selectedExecutor);
    },
    filteredByTaskType() {
      if (!this.selectedTaskType) {
        return this.forFilterTask;
      }
      return this.forFilterTask.filter(task => task.type === this.selectedTaskType);
    },
    filteredTasksByDate() {
      const filterDate = new Date(this.selectedDate);

      if (this.selectedDateFilter === 'Равно') {
        return this.forFilterTask.filter(task => dateFromString(task.dateEnd).toDateString() === filterDate.toDateString());
      } else if (this.selectedDateFilter === 'Больше') {
        return this.forFilterTask.filter(task => dateFromString(task.dateEnd) > filterDate);
      } else if (this.selectedDateFilter === 'Меньше') {
        return this.forFilterTask.filter(task => dateFromString(task.dateEnd) < filterDate);
      } else if (this.selectedDateFilter === 'Без даты') {
        return this.forFilterTask.filter(task => !task.dateEnd);
      } else {
        return this.getTasks;
      }
    },
    filteredTasks() {
      return this.filteredByExecutor
        .filter(task => this.filteredByTaskType.includes(task))
        .filter(task => this.filteredTasksByDate.includes(task))
    },
  },
  components: {
    MyForm,
    myCard
  },
  mounted() {
    this.forFilterTask = this.getTasks;
  }
}
</script>

<style>
.add_button {
  color: black;
  margin-bottom: 10px;
  padding: 5px;
  border: 2px black solid;
  display: inline-block;
}

.block_category {
  display: flex;
  align-items: center;
  flex-direction: column;
  border: #455A64 4px solid;
  border-radius: 25px;
  padding: 20px;
  margin: 20px;
  width: 30%;
  min-height: 100vh;
}

.input_date {
  border-radius: 5px;
  font-size: 16px;
  width: 200px;
}

.input_date:focus {
  border-color: #007BFF;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.input_filter {
  width: 50%;
}
</style>

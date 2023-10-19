<template>
  <v-row style="display: flex; justify-content: space-between">
    <v-btn @click="changeFilter">
      <v-icon icon="fa:fas fa-filter"></v-icon>
    </v-btn>
    <router-link class="add_button" to="/addTask">
      <v-icon icon="fa:fas fa-plus"></v-icon>
    </router-link>
  </v-row>
  <v-row v-if="isFilter">
    <v-card position="absolute" style="z-index: 1" width="100%">
      <p>Фильтрация задач</p>
      <v-card-text>
        <v-text-field v-if="selectedDateFilter !== 'Без даты'" type="date" v-model="selectedDate" class="input_date"/>
        <my-select
          v-if="selectedDate"
          v-model="selectedDateFilter"
          :select-items="optionsDateFilter"
          label="Фильтрация для даты"
          class="mb-4 input_filter"
        />
        <my-select
          v-model="selectedExecutor"
          :select-items="forFilterExecutor"
          item-title="title"
          item-value="value"
          label="Исполнитель"
          class="mb-4 input_filter"
        />
        <my-select
          v-model="selectedTaskType"
          :select-items="getTypesTasks"
          label="Тип задачи"
          class="mb-4 input_filter"
        />
        <v-btn class="text_transform" color="blue-grey-darken-2" @click="ClearFilter">
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
      <div class="columns">
        <v-text-field
          v-model="category.title"
          :disabled="!category.isEditColumn"
        />
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
import MySelect from "@/components/UI/MySelect.vue";

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
      selectedExecutor: null,
      selectedTaskType: '',
      selectedDateFilter: '',
      selectedDate: '',
      isFormValid: true,
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
      this.selectedExecutor = null;
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
    forFilterExecutor() {
      return [...Array.from(new Set(this.getTasks.map(task => {
        return {title: task.executor, value: task.executor}
      }))).filter(executor => executor.title !== ''), {title: 'Без исполнителя', value: ''}]
    },
    filteredByExecutor() {
      if (this.selectedExecutor === null) {
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
    MySelect,
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
  border: #455A64 2px solid;
  border-radius: 15px;
  padding: 15px;
  margin: 15px;
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

.text_transform {
  text-transform: capitalize;
}

.columns {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}
</style>

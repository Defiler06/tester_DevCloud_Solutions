import {createStore} from 'vuex'

const store = createStore({
  state: {
    tasks: [
      {
        id: 1,
        type: 'Проектные задачи',
        description: 'Завершить разработку определенной функциональности в проекте',
        department: 'Frontend',
        executor: 'Артем Ногай',
        dateEnd: '15/10/2023',
        dateStart: new Date(),
        amountTime: 10,
        isDone: true,
        columnId: 1
      },
      {
        id: 2,
        type: 'Менеджмент проекта',
        description: 'Планирование и распределение задач между членами команды',
        department: 'Менеджмент',
        executor: 'Елдос Бакытбаев',
        dateEnd: '19/10/2023',
        dateStart: new Date(),
        amountTime: 2,
        isDone: false,
        columnId: 1
      },
      {
        id: 3,
        type: 'Анализ и планирование',
        description: 'Разработать стратегию маркетинга и план мероприятий',
        department: 'Аналитика',
        executor: 'Чачин Олег',
        dateEnd: '22/10/2023',
        dateStart: new Date(),
        amountTime: 3,
        isDone: true,
        columnId: 1
      }
    ],
    typeTasks: [
      'Анализ и планирование',
      'Менеджмент проекта',
      'Проектные задачи',
      'Frontend задачи',
    ],
    departments: [
      'Frontend',
      'Backend',
      'Менеджмент',
      'Аналитика',
    ],
    categories: [
      {
        id: 1,
        title: 'Новые задачи',
        isEditColumn: false,
      },
      {
        id: 2,
        title: 'В прогрессе',
        isEditColumn: false,
      },
      {
        id: 3,
        title: 'Законченные задачи',
        isEditColumn: false,
      }
    ],
    taskById:
      {
        id: '',
        type: '',
        description: '',
        department: '',
        executor: '',
        dateEnd: '',
        dateStart: new Date(),
        amountTime: '',
        isDone: true
      }
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    getTypesTasks(state) {
      return state.typeTasks;
    },
    getDepartments(state) {
      return state.departments;
    },
    getTaskById(state) {
      return state.taskById
    },
    getCategories(state) {
      return state.categories
    }
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
    },
    changeTask(state, itemId) {
      const index = state.tasks.findIndex(element => element.id === itemId)
      state.taskById = state.tasks[index];
    },
    changeTasks(state, tasks) {
      state.tasks = tasks;
    }

  }
})

export default store;

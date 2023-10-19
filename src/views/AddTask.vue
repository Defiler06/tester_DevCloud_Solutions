<template>
  <v-sheet max-width="1200" class="mx-auto">
    <my-form
      :formDataProps="task"
      :validForm="isFormValid"
      :submitHandlerProps="submitHandler"
      text="Добавить"
      title-form="Добавление задачи"
    />
  </v-sheet>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {nanoid} from "nanoid";
import MyForm from "@/components/MyForm.vue";

export default {
  name: 'add-task',
  components: {MyForm},
  data: () => ({
    task: {
      id: '',
      type: '',
      description: '',
      department: '',
      executor: '',
      dateEnd: '',
      dateStart: new Date(),
      amountTime: '',
      isDone: false,
      categoryId: 1,
    },
    isFormValid: true
  }),
  computed: mapGetters(['getTypesTasks', 'getDepartments', 'getTasks']),
  methods: {
    ...mapMutations(["addTask"]),
    submitHandler() {
      this.task.id = nanoid();
      this.addTask(this.task);
      this.$router.push({name: 'HomePage'});
    }
  }
}
</script>


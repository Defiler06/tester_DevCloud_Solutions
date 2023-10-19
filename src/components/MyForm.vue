<template>
  <v-form @submit.prevent="submitHandler" v-model="isValidForm">
    <v-row>
      <v-col cols="12" sm="6" md="4">
        {{ titleForm }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <my-select
          v-model="formData.type"
          :select-items="getTypesTasks"
          label="Тип задачи*"
          :rules="[v => !!v || 'Укажите тип задачи']"
        />
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <my-select
          v-model="formData.department"
          :select-items="getDepartments"
          label="Отвественный отдел*"
          :rules="[v => !!v || 'Укажите отвественный отдел']"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="12">
        <v-textarea
          label="Описание задачи*"
          :rules="[v => !!v || 'Заполните описание задачи']"
          v-model="formData.description"
          required
          class="mb-4"
        />
      </v-col>
    </v-row>
    <my-text-field
      v-model="formData.executor"
      label="Исполнитель"
    />
    <my-text-field
      v-model="formData.amountTime"
      :rules="[v => !!v || 'Укажите кол-во времени' , v => v > 0 || 'Отрицательное значение']"
      label="Кол-во времени (в часах)*"
    />
    <my-text-field
      v-model="formData.dateEnd"
      label="Дата окончания DD/MM/YYYY"
      @onInputHandler="formatDateInput"
    />
    <v-btn
      type="submit"
      class="mt-2 bg-blue-grey-darken-4"
      :text="text"
      :disabled="!isValidForm"
    />
  </v-form>
</template>

<script>
import {mapGetters} from "vuex";
import MySelect from "@/components/UI/MySelect.vue";
import MyTextField from "@/components/UI/MyTextField.vue";

export default {
  name: 'my-form',
  components: {MyTextField, MySelect},
  props: ['formDataProps', 'validForm', 'submitHandlerProps', 'text', 'titleForm'],
  data() {
    return {
      formData: this.formDataProps,
      isValidForm: this.validForm
    }
  },
  computed: mapGetters(['getTypesTasks', 'getDepartments', 'getTasks']),
  methods: {
    submitHandler() {
      this.submitHandlerProps();
    },
    formatDateInput() {
      this.formData.dateEnd = this.formData.dateEnd.replace(/[^0-9/]/g, '');

      if (this.formData.dateEnd.length > 10) {
        this.formData.dateEnd = this.formData.dateEnd.substring(0, 10);
      }

      if (this.formData.dateEnd.length === 2 && this.formData.dateEnd.charAt(2) !== '/') {
        this.formData.dateEnd += '/';
      } else if (this.formData.dateEnd.charAt(2) === '/' && this.formData.dateEnd.length === 3) {
        this.formData.dateEnd = this.formData.dateEnd.substring(0, 2);
      }

      if (this.formData.dateEnd.length === 5 && this.formData.dateEnd.charAt(5) !== '/') {
        this.formData.dateEnd += '/';
      } else if (this.formData.dateEnd.charAt(5) === '/' && this.formData.dateEnd.length === 6) {
        this.formData.dateEnd = this.formData.dateEnd.substring(0, 5);
      }
    },
  }
}
</script>


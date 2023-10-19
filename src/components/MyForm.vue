<template>
  <v-form @submit.prevent="submitHandler" v-model="isValidForm">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md=""
      >
        {{ titleForm }}
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <v-select
          v-model="formData.type"
          :items="getTypesTasks"
          :rules="[v => !!v || 'Укажите тип задачи']"
          label="Тип задачи*"
          required
          class="mb-4"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <v-select
          v-model="formData.department"
          :items="getDepartments"
          :rules="[v => !!v || 'Укажите отвественный отдел']"
          label="Отвественный отдел*"
          required
          class="mb-4"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="12"
      >
        <v-textarea
          label="Описание задачи*"
          :rules="[v => !!v || 'Заполните описание задачи']"
          v-model="formData.description"
          required
          class="mb-4"
        />
      </v-col>
    </v-row>
    <v-text-field
      v-model="formData.executor"
      label="Исполнитель*"
      required
      class="mb-4"
    />
    <v-text-field
      v-model="formData.amountTime"
      :rules="[v => !!v || 'Укажите кол-во времени']"
      label="Кол-во времени*"
      required
      class="mb-4"
    />
    <v-text-field
      v-model="formData.dateEnd"
      label="Дата окончания DD/MM/YYYY"
      required
      :counter="10"
      @input="formatDateInput"
      class="mb-4"
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

export default {
  name: 'my-form',
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


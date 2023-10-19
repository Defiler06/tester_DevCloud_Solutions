<template>
  <v-card
    width="500"
    class="py-2 pa-2 d-flex flex-column justify-space-around mt-10"
    :class="cardColor"
    min-height="300"
  >
    <v-card-text class="d-flex flex-column align-start">
      <v-row>
        <v-col cols="12" sm="6" md="6" v-if="!cardData.isDone">
          <v-btn style="background: none" @click="changeStatus(cardData.id)">
            <v-icon icon="fa:fas fa-check" color="success"></v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-btn @click="clickHandler(cardData.id)">
            ...
          </v-btn>
        </v-col>
      </v-row>
      <div>
        <v-card-title>{{ cardData.type }}</v-card-title>
        <v-card-subtitle>{{ cardData.department }}</v-card-subtitle>
        <v-card-item>{{ cardData.description }}</v-card-item>
        <v-divider vertical></v-divider>
        <v-text-field v-model="cardData.executor"/>
        <v-spacer></v-spacer>
        <v-card-text v-if="cardData.dateEnd"
                     class="rounded-lg bg-deep-orange-accent-4 d-flex align-center justify-center">
          {{ formattedDate(cardData.dateEnd) }}
        </v-card-text>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import {formattedDate} from "@/helpers/formatedDate";

export default {
  name: 'my-card',
  props: ['taskData'],
  methods: {
    formattedDate,
    clickHandler(itemId) {
      this.$emit('openModal', itemId);
    },
    changeStatus(itemId) {
      this.$emit('changeStatus', itemId);
    }
  },
  data() {
    return {
      cardData: this.taskData
    }
  },
  computed: {
    cardColor() {
      return {
        "bg-blue-grey-lighten-5": !this.cardData.isDone,
        "bg-lime-lighten-5": this.cardData.isDone
      };
    }
  },
}
</script>


<template>
  <v-text-field
    v-model="model"
    :rules="rules"
    :label="label"
    required
    @input="onInputHandler"
    class="mb-4"
  />
</template>

<script>
export default {
  name: 'my-textField',
  props: ['vModel', 'rules', 'label', 'onInput'],
  data() {
    return {
      model: this.vModel,
    }
  },
  methods: {
    onInputHandler() {
      this.$emit('onInputHandler');
    },
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <v-select
    v-model="model"
    :items="items"
    :rules="rules"
    :label="label"
    required
    class="mb-4"
  />
</template>

<script>
export default {
  name: 'my-select',
  props: ['vModel', 'selectItems', 'rules', 'label'],
  data() {
    return {
      model: this.vModel,
      items: this.selectItems
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

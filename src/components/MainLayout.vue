<template>
  <v-layout>
    <v-app-bar app color="blue-grey-darken-2" dark>
      <v-toolbar-title>
        <router-link to="/" class="link_nav">Task Manager</router-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>
export default {
  name: 'main-layout'
}
</script>

<style>
* {
  text-decoration: none;
  font-family: Arial;
  font-size: 22px;
}

.link_nav {
  color: whitesmoke;
  margin-right: 40px;
}
</style>

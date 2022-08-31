<template>
  <v-app>

  <NavMenu />

  <v-main>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-main>
  
  </v-app>
</template>

<script>

  export default {
  data: () => ({

  })
  }
</script>

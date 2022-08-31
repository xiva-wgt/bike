<template>
<v-container fluid>

<v-app-bar app clipped-left>
  <v-icon> mdi-pirate </v-icon>
    <router-link style="text-decoration: none; color: inherit;" to="/">
      <v-toolbar-title class="text-h6">MotoHub</v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          v-if="!permanent" 
          @click.stop="drawer = !drawer"
          v-bind="attrs"
          v-on="on"
          >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <span>Person Page</span>
    </v-tooltip>
</v-app-bar>

<v-navigation-drawer
  v-model="drawer"
  :permanent="permanent"
  expand-on-hover
  clipped
  right
  app
>
  <v-list nav>
    <v-list-item v-for="item in items" :key="item.title" link>
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <router-link
          style="text-decoration: none; color: inherit"
          :to="item.route"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </router-link>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</v-navigation-drawer>

</v-container>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    permanent: false,
    show: false,
    items: [
      { title: "List Adds", icon: "mdi-view-dashboard", route: "/" },
      { title: "Card Club", icon: "mdi-image", route: "/add" },
      { title: "Stock & Parts", icon: "mdi-help-box", route: "/add" },
    ],
  }),
};
</script>
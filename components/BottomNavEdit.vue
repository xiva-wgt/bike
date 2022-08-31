<template>
  <v-container>
    <FilterAdds
      :dataFilter="dataFilter"
      :selTypMoto="selTypMoto"
      :selBrandMoto="selBrandMoto"
      :selCity="selCity"
    />

    <v-bottom-navigation v-model="value" :background-color="color" dark shift fixed app>
      <v-btn @click="$emit('motoList')">
        <span>Moto</span>

        <v-icon>mdi-motorbike</v-icon>
      </v-btn>

      <v-btn @click="$emit('partsList')">
        <span>Parts</span>

        <v-icon>mdi-wrench</v-icon>
      </v-btn>

      <v-btn @click="$emit('serviceList')">
        <span>Service</span>

        <v-icon>mdi-handshake</v-icon>
      </v-btn>

      <v-btn @click="$emit('eventsList')">
        <span>Events</span>

        <v-icon>mdi-newspaper</v-icon>
      </v-btn>

      <v-btn v-if="!permanent" @click.stop="drawer = !drawer">
        <span>Person</span>

        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-bottom-navigation>

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
            <router-link style="text-decoration: none; color: inherit" :to="item.route">
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
  props: ["selTypMoto", "selBrandMoto", "selCity"],

  data: () => ({
    Array: true,
    show: false,
    value: 0,
    drawer: null,
    permanent: false,
    items: [
      { title: "List Adds", icon: "mdi-view-dashboard", route: "/" },
      { title: "Card Club", icon: "mdi-image", route: "/add" },
      { title: "Stock & Parts", icon: "mdi-help-box", route: "/add" },
    ],
  }),
  computed: {
    color() {
      switch (this.value) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
      }
    },
    dataFilter() {
      switch (this.value) {
        case 0:
          return {
            color: "blue-grey",
            nameBtn1: "Filter Moto Adds",
            nameBtn2: "Select Moto Adds",
          };
        case 1:
          return {
            color: "teal",
            nameBtn1: "Filter Part Adds",
            nameBtn2: "Select Part Adds",
          };
        case 2:
          return {
            color: "brown",
            nameBtn1: "Filter Service Adds",
            nameBtn2: "Select Service Adds",
          };
        case 3:
          return {
            color: "indigo",
            nameBtn1: "Filter Event Adds",
            nameBtn2: "Select Event Adds",
          };
      }
    },
  },
  methods: {},
};
</script>

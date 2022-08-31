<template>
  <v-container>
    <FilterMotoAdds 
      v-if="dataFilter.color == 'blue-grey'"
      :dataFilter="dataFilter" 
    />
    <FilterPartAdds
      v-if="dataFilter.color == 'teal'"
      :dataFilter="dataFilter"
    />
    <FilterServiceAdds 
      v-if="dataFilter.color == 'brown'"
      :dataFilter="dataFilter"    
    />
    <FilterEventAdds 
      v-if="dataFilter.color == 'indigo'"
      :dataFilter="dataFilter"    
    />

    <v-bottom-navigation
      v-model="value"
      :background-color="color"
      dark
      shift
      fixed
      app
    >
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
    </v-bottom-navigation>

  </v-container>
</template>

<script>

export default {

  data: () => ({
    Array: true,
    value: 0,
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
          return {color: "blue-grey", nameBtn1: "Filter Moto Adds", nameBtn2: "Select Moto Adds"};
        case 1:
          return {color: "teal", nameBtn1: "Filter Part Adds", nameBtn2: "Select Part Adds"};
        case 2:
          return {color: "brown", nameBtn1: "Filter Service Adds", nameBtn2: "Select Service Adds"};
        case 3:
          return {color: "indigo", nameBtn1: "Filter Event Adds", nameBtn2: "Select Event Adds"};
      }
    },
  },
  methods: {},
};
</script>

<template>
  <v-container>

    <v-bottom-navigation
      v-model="value"
      :background-color="color"
      dark
      shift
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
  
    <v-btn>
      <span>Events</span>
  
      <v-icon>mdi-newspaper</v-icon>
    </v-btn>
    </v-bottom-navigation>

  </v-container>
</template>

<script>
export default {
  data: () => ({ 
    show: false,
    value: 0,
    drawer: null,
    permanent: false, 
        items: [
          { title: 'List Adds', icon: 'mdi-view-dashboard', route: '/' },
          { title: 'Card Club', icon: 'mdi-image', route: '/add' },
          { title: 'Stock & Parts', icon: 'mdi-help-box', route: '/add' },
        ]
    }),
  computed: {
    color () {
      switch (this.value) {
        case 0: return 'blue-grey'
        case 1: return 'teal'
        case 2: return 'brown'
        case 3: return 'indigo'
        default: return 'blue-grey'
      }
    },
  },
  methods: {

  },
}
</script>
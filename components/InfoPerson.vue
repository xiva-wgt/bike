<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="8"
      >
        <v-card>
          <v-card-title class="cyan darken-1">
            <span class="text-h5 white--text">{{ personId.user }}</span>
  
            <v-spacer></v-spacer>

            <v-avatar size="40">
              <img :src="require(`@/static/images/${personId.avatar}`)" fluid />
            </v-avatar>
          </v-card-title>
  
          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>{{ personId.contact }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-message-text</v-icon>
              </v-list-item-action>
            </v-list-item>
  
            <v-divider inset></v-divider>
  
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>{{ personId.contact }}</v-list-item-title>
              </v-list-item-content>
  
              <v-list-item-action>
                <v-icon>mdi-message-text</v-icon>
              </v-list-item-action>
            </v-list-item>
  
            <v-divider inset></v-divider>
  
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-email</v-icon>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>mcbeal@example.com</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
  
            <v-divider inset></v-divider>
  
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>{{ personId.address }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
  
    <v-bottom-navigation
      :value="value"
      color="teal"
      grow
    >
      <v-btn>
        <span>Recents</span>
  
        <v-icon>mdi-history</v-icon>
      </v-btn>
  
      <v-btn>
        <span>Favorites</span>
  
        <v-icon>mdi-heart</v-icon>
      </v-btn>
  
      <v-btn>
        <span>Nearby</span>
  
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['personId'],
  data() {
    return {
      Object: true,
      value: 1,
    };
  }
}
</script>
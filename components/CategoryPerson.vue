<template>
  <v-row>
    
    <v-col md="12">
      <v-card>
        
        <v-img
          height="100px"
          :src="require(`@/assets/images/01.jpg`)"
          class="d-flex align-end"
        >
          <h2 class="ml-4 mb-4 text-h5 white--text">Another ADDS PERSON</h2>
        </v-img>
        <BotNavPersAdds />
      </v-card>
    </v-col>
    
    <v-col md="12">
      <v-card>
        
        <v-card-text>
          <!--
            Здесь внутри начинаем выводить товары,
            для этого создаем список
          -->
          <v-list-item-group>
            
            <v-list-item v-for="item in personSelectAdds" :key="item.id">
                            
              <v-list-item-avatar>
                <!-- Выводим изображение товара -->
              <img :src="require(`@/static/images/${item.images[0]}`)" fluid />
              </v-list-item-avatar>

              <v-list-item-content>
                
                <v-list-item-title>
                  <!-- Выводим название товара -->
                  <h5 class="text-h6">{{ item.name }}</h5>
                </v-list-item-title>
                
                <v-list-item-subtitle>
                  <!-- Выводим цену товару -->
                  <b>{{ item.price }}</b>
                </v-list-item-subtitle>
                
              </v-list-item-content>

              <v-list-item-action>
                <!-- Добавляем кнопку для покупки товара -->
                <v-btn icon>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-list-item-action>

            </v-list-item>

          </v-list-item-group>

        </v-card-text>
        
      </v-card>
    
    </v-col>
    
  </v-row>
</template>

<script>

export default {
  props: ['personSelectAdds'],
  data: () => ({
    Array: true,
  }),

}
</script>
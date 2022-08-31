<template>
  <v-container fluid fill-height>
    <v-hover v-slot:default="{ hover }" open-delay="200">
      <v-card :elevation="hover ? 24 : 12">
        <v-list-item-group>
          <v-list-item>
            <nuxt-link :to="`/person/${item.user.id}`">
              <v-list-item-avatar>
                <!-- Выводим изображение товара -->
                <img
                  :src="require(`@/static/images/avatars/${item.user.avatar}`)"
                  fluid
                />
              </v-list-item-avatar>
            </nuxt-link>

            <v-list-item-content>
              <v-list-item-title>
                <!-- Выводим название товара -->
                <h5 class="text-h7">{{ item.name }}</h5>
              </v-list-item-title>

              <v-list-item-subtitle>
                <!-- Выводим цену товару -->
                <b>{{ item.price }} Пинт Рома</b>
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

        <v-carousel hide-delimiters height="250">
          <v-carousel-item
            v-for="img in item.images"
            :key="img"
            :src="require(`@/static/images/${img}`)"
          >
          </v-carousel-item>
        </v-carousel>

        <v-card-title>
          <h5 class="text-h6">Время работы: {{ item.issue }}</h5>
        </v-card-title>

        <v-card-subtitle>
          <h5 class="text-h7">Условия: {{ item.mileage }}</h5>
        </v-card-subtitle>

        <v-card-actions>
          <v-btn depressed>
            <nuxt-link
              style="text-decoration: none; color: inherit"
              :to="`/add/${item.id}`"
            >
              Go to Card
            </nuxt-link>
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              <p class="text-body-1">{{ item.characteristic }}</p>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
export default {
  props: ["item"],

  data: () => ({
    Object: true,
    show: false,
  }),

  methods: {},

  computed: {},
};
</script>

<style></style>
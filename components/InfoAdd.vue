<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center">
      <v-col md="6">
        <v-card>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <!-- Выводим название товара -->
                  <h5 class="text-h7">{{ itemId.name }}</h5>
                </v-list-item-title>

                <v-list-item-subtitle>
                  <!-- Выводим цену товару -->
                  <b>{{ itemId.price }}</b>
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

          <v-carousel hide-delimiters height="350" v-model="imageIndex">
            <v-carousel-item
              v-for="img in itemId.images"
              :key="img"
              :src="require(`@/static/images/${img}`)"
            >
            </v-carousel-item>
          </v-carousel>

          <v-sheet class="mx-auto" elevation="8" max-width="800">
            <v-slide-group class="pa-1" center-active show-arrows>
              <v-slide-item
                v-for="(img, i) in itemId.images"
                :key="img"
                v-slot="{ active }"
              >
                <v-card
                  class="ma-4"
                  height="44"
                  width="32"
                  @click="activateImage(`${img}`, i)"
                >
                  <v-img
                    :lazy-src="require(`@/static/images/${img}`)"
                    :src="require(`@/static/images/${img}`)"
                    height="100%"
                    width="100%"
                  ></v-img>
                  <v-row class="fill-height" align="center" justify="center">
                    <v-scale-transition>
                      <v-icon
                        v-if="active"
                        color="white"
                        size="48"
                        v-text="'mdi-close-circle-outline'"
                      ></v-icon>
                    </v-scale-transition>
                  </v-row>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>

          <v-card-title>
            <h5 class="text-h6">{{ itemId.issue }}</h5>
          </v-card-title>

          <v-card-subtitle>
            <h5 class="text-h7">{{ itemId.mileage }}</h5>
          </v-card-subtitle>
          <v-card>
            <v-card-text>
              <span>Characteristics: </span>
              <p class="font-weight-light">{{ itemId.characteristic }}</p>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-text>
            <span>Description: </span>
            <p class="font-weight-light">{{ itemId.description }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["itemId"],
  data() {
    return {
      Object: true,
      activeSlide: null,
      imageIndex: 0,
    };
  },

  methods: {
    activateImage(img, i) {
      console.log("active ", img, i);
      this.activeSlide = img;
      this.imageIndex = i;
    },
  },

  /** вариант 1
  async asyncData() {
    this.items = this.$axios
      .get("http://localhost:3000/products/products.json")
      .then((res) =>
        res.data.filter((item) => item.id == this.$route.params.id)
      );
  },
  **/

  /** вариант 2
  async asyncData() {
    this.items = fetch(
      "http://localhost:3000/products/products.json"
    ).then((res) =>
      res.json().data.filter((item) => item.id == this.$route.params.id)
    );
  },
  **/

  /** вариант 3
  async fetch() {
    const response = await fetch(
      "http://localhost:3000/products/products.json"
    );
    this.items = await response.json();
    console.log(this.items);
  },
  **/

  /** вариант 4 
  async fetch() {
    const products = await this.$axios.get(
      "http://localhost:3000/products/products.json"
    ).data;
    this.items = products.filter((item) => item.id == this.$route.params.id);
  },
  **/
};
</script>

<style></style>

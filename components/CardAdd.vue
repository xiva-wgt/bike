<template>
    <v-container>
      <v-row justify="center" align="start">
        <v-col md="5" sm="5" xs="12">

          <v-carousel hide-delimiters height="350" v-model="imageIndex">
            <v-carousel-item
              v-for="(img) in cardAdd.images"
              :key="img"
              :src="require(`@/static/images/${img}`)"
            >
            </v-carousel-item>
          </v-carousel>

          <v-sheet class="mx-auto" elevation="8" max-width="800">
            <v-slide-group class="pa-1" center-active show-arrows>
              <v-slide-item
                v-for="(img, i) in cardAdd.images"
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

        </v-col>
        <v-col md="7" sm="7" xs="12">
          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>
          <div class="pl-6">
            <p class="display-1 mb-0">{{ cardAdd.name }}</p>
            <v-card-actions class="pa-0">
              <v-list>
              <v-list-item>
              <p class="headline font-weight-light pt-3">{{ cardAdd.price }}
              <del style="" class="subtitle-1 font-weight-thin ml-1">13750.00 USD</del>
              </p>
              </v-list-item>
              <v-list-item>
              <v-rating v-model="rating" class="" 
                        background-color="warning lighten-3"
                        color="warning" 
                        dense>
              </v-rating>
              </v-list-item>
              <v-list-item>
              <span class="body-2	font-weight-thin"> 25 REVIEWS</span>
              </v-list-item>
              </v-list>
            </v-card-actions>

            <p class="subtitle-1 font-weight-thin">
              Characteristics: 
              {{ cardAdd.characteristic }}
            </p>
            <p class="title">SIZE</p>
            <v-radio-group v-model="row" row>
              <v-radio label="XS" value="XS"></v-radio>
              <v-radio label="S" value="s"></v-radio>
              <v-radio label="M" value="m"></v-radio>
              <v-radio label="L" value="l"></v-radio>
              <v-radio label="XL" value="xl"></v-radio>
            </v-radio-group>
            <p class="title">ITEMS</p>

            <v-text-field
                outlined
                style="width:100px"
                :value="1"
                dense
            ></v-text-field>
            <v-btn class="primary white--text" outlined tile dense><v-icon>mdi-cart</v-icon> Favorite</v-btn>
            <v-btn class="ml-4" outlined tile>Post to Wall</v-btn>

          </div>

        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col md="12" sm="12" xs="12">
          <v-tabs>
            <v-tab >Description</v-tab>
            <v-tab >Contact</v-tab>
            <v-tab>REVIEWS</v-tab>

            <v-tab-item>
              <p class="pt-10 subtitle-1 font-weight-thin">
                {{ cardAdd.description }}
              </p>
            </v-tab-item>
            <v-tab-item>
    <InfoPerson 
      :personId="cardAdd"
    />
            </v-tab-item>
            <v-tab-item>
              <v-list>
                <v-list-item-group v-model="item" color="primary">
                  <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                  >
                    <v-list-item-avatar>
                      <img :src="require(`@/static/images/${item.avatar}`)"/>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="item.title"></v-list-item-title><v-rating v-model="rating" class="" background-color="warning lighten-3"
                                                                                           color="warning" dense></v-rating>
                      <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-tab-item>
          </v-tabs>
            <p class="subtitle-1 font-weight-light pt-3 text-center">MiniLIST</p>
            <v-divider></v-divider>
              <CategoryAdd 
                :personSelectAdds="personAdds"
              />
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  props: ['cardAdd', 'personAdds'],
  data() {
    return {
      Object: true,
      Array: true,
      activeSlide: null,
      imageIndex: 0,
            rating:4.5,
            row: true,
            breadcrums: [
                {
                    text: 'Home',
                    disabled: false,
                    href: 'breadcrumbs_home',
                },
                {
                    text: 'Clothing',
                    disabled: false,
                    href: 'breadcrumbs_clothing',
                },
                {
                    text: 'T-Shirts',
                    disabled: true,
                    href: 'breadcrumbs_shirts',
                },
            ],
            item: 5,
            items: [
                {
                    avatar: 'o3.jpg',
                    title: 'Lorem ipsum dolor?',
                    subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Tincidunt arcu non sodales neque sodales ut etiam. Lectus arcu bibendum at varius vel pharetra. Morbi tristique senectus et netus et malesuada.\n" +
                        "\n",
                },
                {
                    avatar: 'o4.jpg',
                    title: 'Lorem ipsum dolor <span class="grey--text text--lighten-1">4</span>',
                    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                },
                {
                    avatar: 'o5.jpg',
                    title: 'Lorem ipsum dolor',
                    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },
                {
                    avatar: 'o6.jpg',
                    title: 'Lorem ipsum dolor',
                    subtitle: ""
                },
                {
                    avatar: 'o7.jpg',
                    title: 'Lorem ipsum dolor',
                    subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                },
            ],
    };
  },
  methods: {
    activateImage(img, i) {
      console.log("active ", img, i);
      this.activeSlide = img;
      this.imageIndex = i;
    },
  }
}
</script>
<!-- src/components/List.vue -->
<template>
  <v-container fluid fill-height>
    <!-- Создаем контейнер внутри которого и будут элементы компонента -->

    <v-row>
      <!-- В это row выводим заголовок компонента -->
      <v-col>
        <h2 class="text-center text-h4 py-2">List classified of MotoLifes</h2>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" dense>
      <v-col class="d-flex" cols="12" sm="4">
        <v-select
          v-model="viewedOnPage"
          :items="viewedOnPageOptions"
          label="viewed on page"
          outlined
          dense
        ></v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="4">
        <v-select
          v-model="select"
          :items="options"
          label="Sort classified"
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col md="4" v-for="item in showClassified" :key="item.id">
        <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-card :elevation="hover ? 24 : 12">
            <v-list-item-group>
              <v-list-item>
                <nuxt-link :to="`/person/${item.user.id}`">
                  <v-list-item-avatar>
                    <!-- Выводим аватар пользователя -->
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
                    <b>{{
                      item.price.toLocaleString("ru-RU", {
                        style: "currency",
                        currency: item.currency,
                      })
                    }}</b>
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

            <v-card-text>
              <p class="text-body-1">Year of manufacture: {{ item.issue }}</p>
              <p class="text-body-1">Mileage: {{ item.mileage }} km</p>
              <p class="text-body-1">Horsepower: {{ item.power }} hp</p>
              <p class="text-body-1">Engin Capacity: {{ item.enginCapacity }} cm<sup>3</sup></p>
            </v-card-text>

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

              <v-btn icon @click="toggleActive(item.id)">
                <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show.includes(item.id)">
                <v-divider></v-divider>

                <v-card-text>
                  <p class="text-body-1">{{ item.characteristic }}</p>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-row>
      <!-- В это row выводим кнопку загрузить ещё -->
      <v-col>
        <v-btn @click="setClassifiedList" :disabled="loading === true">
          {{ loadButtonTest }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["items_list"],
  data: () => ({
    Array: true,
    classifiedList: [],
    urlString: "",
    show: [],
    select: "Popularity",
    viewedOnPage: 3,
    startViewClassified: 0,
    loading: false,
    viewedOnPageOptions: [3, 10, 25, 50, 100],
    options: [
      "Default",
      "Popularity",
      "Relevance",
      "Price: Low to High",
      "Price: High to Low",
    ],
  }),
  methods: {

  },
  mounted: function () {
    this.$store.dispatch("fetchMotoBrands");
    this.$store.dispatch("fetchMotoTypes");
    this.$store.dispatch("fetchMotoDrives");
    this.$store.dispatch("fetchCities");
    this.$store.dispatch("fetchOfferTypes");
    this.setClassifiedList();
    console.log("lists mounted");
  },
  watch: {
    "$store.state.testFilter": function () {
      console.log("run setClassifiedList on $store.state.testFilter");
      // сбрасываем значение старта выборки в ноль, потмоу что фильтры изменились, а не пользователь нажал загурзить еще обьявления
      this.startViewClassified = 0;
      this.setClassifiedList();
    },
  },

  methods: {
    toggleActive(index) {
      if (this.show.includes(index)) {
        this.show = this.show.filter((entry) => entry !== index);
      } else {
        this.show.push(index);
      }
    },
    async setClassifiedList() {
      this.loading = true;
      let filters = this.$store.state.testFilter;
      const url = new URL("http://localhost:3004/classifieds");

      // добавляем чтобы user classifiedType motoModel были запрошены и добавлены в ответ
      url.searchParams.append("_expand", "user");
      url.searchParams.append("_expand", "motoModel");
      // добавляем сколько загружать на странице обьявлений за раз
      url.searchParams.append("_limit", this.viewedOnPage);

      url.searchParams.append("_start", this.startViewClassified);

      // Мотоциклы тип 0, запчасти 1
      url.searchParams.append("classifiedTypeId", "0");

      // фильтрация по цене
      // 3 варианта, есть минимальная цена, максимальная и обе
      // чтобы учесть оба вариант проще отфильтровать по минимальной цене, если она есть и и потом по максимальной если она есть
      // начнем с минимальной
      if (
        filters.rangePrice &&
        filters.rangePrice.min &&
        !isNaN(filters.rangePrice.min) &&
        !isNaN(parseFloat(filters.rangePrice.min))
      ) {
        url.searchParams.append("price_gte", filters.rangePrice.min);
      }
      // продолжим с максимальной
      if (
        filters.rangePrice &&
        filters.rangePrice.max &&
        !isNaN(filters.rangePrice.max) &&
        !isNaN(parseFloat(filters.rangePrice.max))
      ) {
        url.searchParams.append("price_lte", filters.rangePrice.max);
      }

      // фильтрация по лошадиным силам по примеру цены
      // начнем с минимальной
      if (
        filters.rangePower &&
        filters.rangePower.min &&
        !isNaN(filters.rangePower.min) &&
        !isNaN(parseFloat(filters.rangePower.min))
      ) {
        url.searchParams.append("power_gte", filters.rangePower.min);
      }
      // продолжим с максимальной
      if (
        filters.rangePower &&
        filters.rangePower.max &&
        !isNaN(filters.rangePower.max) &&
        !isNaN(parseFloat(filters.rangePower.max))
      ) {
        url.searchParams.append("power_lte", filters.rangePower.max);
      }

      // фильтрация по объему движка по примеру цены
      // начнем с минимальной
      if (
        filters.enginCapacity &&
        filters.enginCapacity.min &&
        !isNaN(filters.enginCapacity.min) &&
        !isNaN(parseFloat(filters.enginCapacity.min))
      ) {
        url.searchParams.append("enginCapacity_gte", filters.enginCapacity.min);
      }
      // продолжим с максимальной
      if (
        filters.enginCapacity &&
        filters.enginCapacity.max &&
        !isNaN(filters.enginCapacity.max) &&
        !isNaN(parseFloat(filters.enginCapacity.max))
      ) {
        url.searchParams.append("enginCapacity_lte", filters.enginCapacity.max);
      }

      // фильтрация по году выпуска по примеру цены
      // начнем с минимальной
      if (
        filters.rangeYears &&
        filters.rangeYears.min &&
        !isNaN(filters.rangeYears.min) &&
        !isNaN(parseFloat(filters.rangeYears.min))
      ) {
        url.searchParams.append("issue_gte", filters.rangeYears.min);
      }
      // продолжим с максимальной
      if (
        filters.rangeYears &&
        filters.rangeYears.max &&
        !isNaN(filters.rangeYears.max) &&
        !isNaN(parseFloat(filters.rangeYears.max))
      ) {
        url.searchParams.append("issue_lte", filters.rangeYears.max);
      }

      // фильтрация по пробегу по примеру цены
      // начнем с минимальной
      if (
        filters.rangeMileage &&
        filters.rangeMileage.min &&
        !isNaN(filters.rangeMileage.min) &&
        !isNaN(parseFloat(filters.rangeMileage.min))
      ) {
        url.searchParams.append("mileage_gte", filters.rangeMileage.min);
      }
      // продолжим с максимальной
      if (
        filters.rangeMileage &&
        filters.rangeMileage.max &&
        !isNaN(filters.rangeMileage.max) &&
        !isNaN(parseFloat(filters.rangeMileage.max))
      ) {
        url.searchParams.append("mileage_lte", filters.rangeMileage.max);
      }

      // так как наш фэйковый бэкэнд не позволяет фильтровать releations поля, то часть фильтрации будет после запроса
      // фильтрация по рейтингу, городу будет идти по user
      // фильтрация по категории мотоцикла и тип передачи будет идти по motoModel

      let urlString = url.toString();
      if (urlString !== this.urlString) {
        console.log("urlString change from " + this.urlString + " to " + urlString);
        this.urlString = urlString;
      } else {
        console.log("urlString no change - " + urlString);
        this.loading = false;
        return;
      }
      if (this.startViewClassified === 0) {
        // сбрасываем кэш обьявлений, потмоу что или условия поиска обновились илитолько начали отображать обьявления
        this.classifiedList = [];
      }
      // теперь мы уверены что строка поиска изменилась и мы можем увеличить счетчик начала выборки обьявлений
      // сколько обяьвлений пропустить сначала при каждом вызове этот счетчик будет увеличиватся
      this.startViewClassified += this.viewedOnPage;
      try {
        const response = await this.$axios.get(urlString);
        let data = response.data;
        data.forEach((item) => {
          let brand = "";
          this.$store.state.motoBrands.forEach((x) => {
            if (item.motoModel.motoBrandId === x.id) {
              brand = x.name;
            }
          });
          item.name = brand + " " + item.motoModel.name;
          return item;
        });
        data.map((item) => {
          let isNew = true;
          this.classifiedList.map((classifiedItem) => {
            if (item.id === classifiedItem.id) {
              isNew = false;
            }
          });
          if (isNew) {
            this.classifiedList.push(item);
          }
        });
        // console.log("this.classifiedList - " + JSON.stringify(this.classifiedList));
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
  },
  computed: {
    loadButtonTest() {
      return this.loading ? "Loading..." : "Load more";
    },
    filters() {
      return this.$store.state.testFilter;
    },
    showClassified() {
      let showList = this.classifiedList;
      let filters = this.$store.state.testFilter;
      // теперь надо отфильровать все что не смогли на нашем сервере отфильровать

      // фильтруем по рейтингу
      if (typeof filters.customerRating !== "undefined" && filters.customerRating > 0) {
        showList = showList.filter((item) => {
          item.user.raiting >= filters.customerRating;
        });
      }

      // фильтруем по городу
      ///*
      if (typeof filters.city !== "undefined" && filters.city.length > 0) {
        showList = showList.filter((item) => {
          item.user.city >= filters.city;
        });
      }
      //*/

      // фильтруем по типу продавца
      if (typeof filters.typeOffer !== "undefined" && filters.typeOffer > -1) {
        showList = showList.filter((item) => {
          item.user.offerTypeId === filters.typeOffer;
        });
      }

      // фильтруем по типу передачи
      if (typeof filters.typeDrive !== "undefined" && filters.typeDrive > -1) {
        showList = showList.filter((item) => {
          item.motoModel.motoDriveId === filters.typeDrive;
        });
      }

      // фильтруем по типу
      ///*
      if (typeof filters.motoTypes !== "undefined" && filters.motoTypes.length > 0) {
        // для подбора типа (их может быть несколько) из двух array надо найти значения, которые есть в обоих (пересечние)
        // let intersection = arrA.filter(x => arrB.includes(x));
        showList = showList.filter((item) => {
          let intersection = filters.motoTypes.filter((x) =>
            item.motoModel.motoTypeIds.includes(x)
          );
          return intersection.length > 0;
        });
      }
      //*/

      // фильтруем по фирме
      ///*
      if (typeof filters.motoBrands !== "undefined" && filters.motoBrands.length > 0) {
        let brandIds = [];
        filters.motoBrands.forEach((x) => {
          this.$store.state.motoBrands.forEach((y) => {
            if (y.name === x) {
              brandIds.push(y.id);
            }
          });
        });
        showList = showList.filter((item) => {
          brandIds.includes(item.motoModel.motoBrandId);
        });
      }
      //*/
      return showList;
    },
  },
};
</script>

<style></style>

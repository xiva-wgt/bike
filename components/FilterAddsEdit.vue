<template>
  <v-container>
    <v-bottom-sheet v-model="isShowFilters" scrollable v-show="dataFilter !== null">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fixed
          bottom
          class="mb-12 white--text"
          :color="dataFilter.color"
          rounded
          elevation="20"
          fab
          height="30"
          block
          v-bind="attrs"
          v-on="on"
          @click="onShowAndHideFiltres"
        >
          {{ dataFilter.nameBtn1 }}
        </v-btn>
      </template>

      <v-sheet>
        <v-card outlined>
          <div class="row">
            <v-btn
              @click="onShowAndHideFiltres"
              block
              :color="dataFilter.color"
              class="white--text"
            >
              {{ dataFilter.nameBtn2 }}
            </v-btn>
            <div class="col-md-4 col-sm-4 col-xs-12">
              <v-row>
                <v-card-title>Category</v-card-title>

                <v-tooltip right max-width="250">
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on"> mdi-help-circle-outline </v-icon>
                  </template>
                  Чувак! Вперед за мечтой! Выбери свою телегу!
                </v-tooltip>
              </v-row>
              <template>
                <v-select
                  v-model="motoTypes"
                  v-on:change="submitFilter"
                  :items="allMotoTypesList"
                  chips
                  label="Types models"
                  multiple
                  hide-no-data
                  hide-details
                  solo-inverted
                  flat
                  class="mx-4"
                >
                  <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      close
                      @click="select"
                      @click:close="removeTypes(item)"
                    >
                      <strong>{{ item }}</strong
                      >&nbsp;
                    </v-chip>
                  </template>
                </v-select>
              </template>

              <v-card-title>Brands</v-card-title>
              <template>
                <v-select
                  v-model="motoBrands"
                  v-on:change="submitFilter"
                  :items="allMotoBrandsList"
                  chips
                  label="Brands auto enterprise"
                  multiple
                  hide-no-data
                  hide-details
                  solo-inverted
                  flat
                  class="mx-4"
                >
                  <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      close
                      @click="select"
                      @click:close="removeBrandMoto(item)"
                    >
                      <strong>{{ item }}</strong
                      >&nbsp;
                    </v-chip>
                  </template>
                </v-select>
              </template>

              <v-card-title>Location</v-card-title>
              <template>
                <v-autocomplete
                  v-model="cities"
                  v-on:change="submitFilter"
                  :loading="loading"
                  :items="allCitiesList"
                  :search-input.sync="searchCities"
                  cache-items
                  class="mx-4"
                  flat
                  hide-no-data
                  hide-details
                  label="Place offers"
                  solo-inverted
                  chips
                >
                  <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      close
                      @click="select"
                      @click:close="removeCity(item)"
                    >
                      <v-icon left> mdi-map-marker </v-icon>
                      <strong>{{ item }}</strong
                      >&nbsp;
                    </v-chip>
                  </template>
                </v-autocomplete>
              </template>

              <v-card-title>Type Offer</v-card-title>
              <v-row class="pa-2 mx-4 mb-4">
                <v-btn-toggle v-model="typeOffer" v-on:change="submitFilter">
                  <v-col
                    ><v-btn :color="typeOffer == -1 ? 'yellow' : 'gray'" :value="-1"
                      ><v-icon
                        v-text="typeOffer == -1 ? 'mdi-check-outline' : ''"
                      ></v-icon>
                      All offers
                    </v-btn></v-col
                  >
                  <v-col v-for="offerType in AllOfferTypes" :key="offerType.name"
                    ><v-btn
                      :color="typeOffer == offerType.id ? 'yellow' : 'gray'"
                      :value="offerType.id"
                      ><v-icon
                        v-text="typeOffer == offerType.id ? 'mdi-check-outline' : ''"
                      ></v-icon>
                      {{ offerType.name }}
                    </v-btn></v-col
                  >
                </v-btn-toggle>
              </v-row>
            </div>

            <div class="col-md-4 col-sm-4 col-xs-12">
              <v-card-title>Price</v-card-title>
              <v-row class="pa-2 mx-4" dense>
                <v-col cols="12" sm="5">
                  <v-text-field
                    :value="rangePrice[0]"
                    label="Min"
                    outlined
                    dense
                    v-on:change="
                      $set(
                        rangePrice,
                        0,
                        !isNaN($event) &&
                          !isNaN(parseFloat($event)) &&
                          parseFloat($event) > 0
                          ? parseFloat($event)
                          : null
                      )
                    "
                    :readonly="!rangePriceIsEditing"
                    :hint="!rangePriceIsEditing ? 'Edit Min' : 'Save Min'"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :value="rangePrice[1]"
                    label="Max"
                    outlined
                    dense
                    v-on:change="
                      $set(
                        rangePrice,
                        1,
                        !isNaN($event) 
                        && !isNaN(parseFloat($event))
                        && parseFloat($event) > 0
                        ? parseFloat($event)
                        : null
                      )
                    "
                    :readonly="!rangePriceIsEditing"
                    :hint="!rangePriceIsEditing ? 'Edit Max' : 'Save Max'"
                    persistent-hint
                  >
                    <template v-slot:append-outer>
                      <v-icon
                        :key="`icon-${rangePriceIsEditing}`"
                        :color="rangePriceIsEditing ? 'success' : 'info'"
                        @click="
                          rangePriceIsEditing = !rangePriceIsEditing;
                          submitFilter();
                        "
                        v-text="
                          rangePriceIsEditing
                            ? 'mdi-check-outline'
                            : 'mdi-circle-edit-outline'
                        "
                      ></v-icon>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-card-title>Year of Issue</v-card-title>
              <v-row class="pa-2 mx-4" dense>
                <v-col cols="12" sm="5">
                  <v-text-field
                    :value="rangeYears[0]"
                    label="Min"
                    outlined
                    dense
                    v-on:change="
                      $set(
                        rangeYears,
                        0,
                        !isNaN($event) && !isNaN(parseInt($event)) && parseInt($event) > 0
                          ? parseInt($event)
                          : null
                      )
                    "
                    :readonly="!rangeYearsIsEditing"
                    :hint="!rangeYearsIsEditing ? 'Edit Min' : 'Save Min'"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :value="rangeYears[1]"
                    label="Max"
                    outlined
                    dense
                    v-on:change="
                      $set(
                        rangeYears,
                        1,
                        !isNaN($event) && !isNaN(parseInt($event)) && parseInt($event) > 0
                          ? parseInt($event)
                          : null
                      )
                    "
                    :readonly="!rangeYearsIsEditing"
                    :hint="!rangeYearsIsEditing ? 'Edit Max' : 'Save Max'"
                    persistent-hint
                  >
                    <template v-slot:append-outer>
                      <v-icon
                        :key="`icon-${rangeYearsIsEditing}`"
                        :color="rangeYearsIsEditing ? 'success' : 'info'"
                        @click="
                          rangeYearsIsEditing = !rangeYearsIsEditing;
                          submitFilter();
                        "
                        v-text="
                          rangeYearsIsEditing
                            ? 'mdi-check-outline'
                            : 'mdi-circle-edit-outline'
                        "
                      ></v-icon>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-card-title>Engin Capacity</v-card-title>
              <v-row class="pa-2 mx-4" dense>
                <v-col cols="12" sm="5">
                  <v-text-field
                    :value="enginCapacity[0]"
                    label="Min"
                    outlined
                    dense
                    v-on:change="
                      $set(
                        enginCapacity,
                        0,
                        !isNaN($event) && !isNaN(parseInt($event)) && parseInt($event) > 0
                          ? parseInt($event)
                          : null
                      )
                    "
                    :readonly="!enginCapacityIsEditing"
                    :hint="!enginCapacityIsEditing ? 'Edit Min' : 'Save Min'"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :value="enginCapacity[1]"
                    label="Max"
                    outlined
                    dense
                    v-on:change="
                      $set(
                        enginCapacity,
                        1,
                        !isNaN($event) && !isNaN(parseInt($event)) && parseInt($event) > 0
                          ? parseInt($event)
                          : null
                      )
                    "
                    :readonly="!enginCapacityIsEditing"
                    :hint="!enginCapacityIsEditing ? 'Edit Max' : 'Save Max'"
                    persistent-hint
                  >
                    <template v-slot:append-outer>
                      <v-icon
                        :key="`icon-${enginCapacityIsEditing}`"
                        :color="enginCapacityIsEditing ? 'success' : 'info'"
                        @click="
                          enginCapacityIsEditing = !enginCapacityIsEditing;
                          submitFilter();
                        "
                        v-text="
                          enginCapacityIsEditing
                            ? 'mdi-check-outline'
                            : 'mdi-circle-edit-outline'
                        "
                      ></v-icon>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </div>

            <div class="col-md-4 col-sm-4 col-xs-12">
              <v-card-title>Power, hp.</v-card-title>
              <v-row class="pa-2 mx-4" dense>
                <v-col cols="12" sm="5">
                  <v-text-field
                    :value="rangePower[0]"
                    label="Min"
                    outlined
                    dense
                    v-on:change="
                      $set(
                        rangePower,
                        0,
                        !isNaN($event) && !isNaN(parseInt($event)) && parseInt($event) > 0
                          ? parseInt($event)
                          : null
                      )
                    "
                    :readonly="!rangePowerIsEditing"
                    :hint="!rangePowerIsEditing ? 'Edit Min' : 'Save Min'"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :value="rangePower[1]"
                    label="Max"
                    outlined
                    dense
                    v-on:change="
                      $set(
                        rangePower,
                        1,
                        !isNaN($event) && !isNaN(parseInt($event)) && parseInt($event) > 0
                          ? parseInt($event)
                          : null
                      )
                    "
                    :readonly="!rangePowerIsEditing"
                    :hint="!rangePowerIsEditing ? 'Edit Max' : 'Save Max'"
                    persistent-hint
                  >
                    <template v-slot:append-outer>
                      <v-icon
                        :key="`icon-${rangePowerIsEditing}`"
                        :color="rangePowerIsEditing ? 'success' : 'info'"
                        @click="
                          rangePowerIsEditing = !rangePowerIsEditing;
                          submitFilter();
                        "
                        v-text="
                          rangePowerIsEditing
                            ? 'mdi-check-outline'
                            : 'mdi-circle-edit-outline'
                        "
                      ></v-icon>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-card-title>Type drive</v-card-title>
              <v-row class="pa-2 mx-4">
                <v-btn-toggle v-model="typeDrive" v-on:change="submitFilter">
                  <v-col
                    ><v-btn :color="typeDrive == -1 ? 'yellow' : 'gray'" :value="-1"
                      ><v-icon
                        v-text="typeDrive == -1 ? 'mdi-check-outline' : ''"
                      ></v-icon>
                      All drive
                    </v-btn></v-col
                  >
                  <v-col v-for="motoType in allMotoDrives" :key="motoType.name"
                    ><v-btn
                      :color="typeDrive == motoType.id ? 'yellow' : 'gray'"
                      :value="motoType.id"
                      ><v-icon
                        v-text="typeDrive == motoType.id ? 'mdi-check-outline' : ''"
                      ></v-icon>
                      {{ motoType.name }}
                    </v-btn></v-col
                  >
                </v-btn-toggle>
              </v-row>

              <v-card-title>
                Customer Rating
                <v-rating
                  v-model="customerRating"
                  class="ml-2 mb-2"
                  background-color="warning lighten-3"
                  color="warning"
                  dense
                >
                </v-rating>
                <v-col><v-btn @click="customerRating = 0">Clean rating</v-btn></v-col>
              </v-card-title>
            </div>
          </div>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
export default {
  props: ["dataFilter", "selTypMoto", "selBrandMoto", "selCity"],

  data() {
    return {
      Object: true,
      Array: true,
      isShowFilters: false,
      motoTypes: [],
      motoBrands: [],
      customerRating: 0,
      rating: null,
      cities: [],
      loading: false,
      tagCity: [],
      searchCities: null,
      typeOffer: -1,
      typeDrive: -1,
      enginCapacityIsEditing: false,
      enginCapacity: [null, null],
      rangePriceIsEditing: false,
      rangePrice: [null, null],
      rangeYearsIsEditing: false,
      rangeYears: [null, null],
      rangePowerIsEditing: false,
      rangePower: [null, null],
      rangeMileage: [null, null],
      minMileage: 100,
      maxMileage: 999999,

      dataMotoFilter: [],
    };
  },
  computed: {
    allMotoBrands() {
      return this.$store.state.motoBrands;
    },
    allMotoBrandsList() {
      let motoBrandsList = [];
      this.$store.state.motoBrands.map((item) => motoBrandsList.push(item.name));
      return motoBrandsList;
    },
    allMotoTypes() {
      return this.$store.state.motoTypes;
    },
    allMotoTypesList() {
      let motoTypesList = [];
      this.allMotoTypes.map((item) => motoTypesList.push(item.name));
      return motoTypesList;
    },
    AllOfferTypes() {
      return this.$store.state.offerTypes;
    },
    allCities() {
      return this.$store.state.cities;
    },
    allCitiesList() {
      let citiesList = [];
      this.allCities.map((item) => citiesList.push(item.name));
      return citiesList;
    },
    allMotoDrives() {
      return this.$store.state.motoDrives;
    },
  },
  mounted: function () {
    this.$store.dispatch("fetchMotoBrands");
    this.$store.dispatch("fetchMotoTypes");
    this.$store.dispatch("fetchMotoDrives");
    this.$store.dispatch("fetchCities");
    this.$store.dispatch("fetchOfferTypes");
    console.log("filters mounted");
  },
  watch: {
    searchCities(val) {
      val && val !== this.select && this.querySelections(val);
    },
    customerRating() {
      this.submitFilter();
    },
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.tagCity = this.allCitiesList.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },

    removeTypes(item) {
      this.motoTypes.splice(this.motoTypes.indexOf(item), 1);
      this.motoTypes = [...this.motoTypes];
    },
    removeBrandMoto(item) {
      this.motoBrands.splice(this.motoBrands.indexOf(item), 1);
      this.motoBrands = [...this.motoBrands];
    },

    removeCity(item) {
      this.cities = [];
    },

    onShowAndHideFiltres() {
      console.log("call onShowAndHideFiltres isShowFilters = ", this.isShowFilters);
      // При открытии нам надо расставить настройки для фильтров
      if (this.isShowFilters === false) {
        let data = this.$store.state.dataMotoFilter;
        this.motoTypes = data.motoTypes ? data.motoTypes : [];
        this.motoBrands = data.motoBrands ? data.motoBrands : [];
        this.cities = data.city ? data.city : [];
        this.typeOffer = !isNaN(parseInt(data.typeOffer)) ? data.typeOffer : -1;
        this.rangePrice = data.rangePrice
          ? [
              typeof data.rangePrice.min !== "undefined" ? data.rangePrice.min : null,
              typeof data.rangePrice.max !== "undefined" ? data.rangePrice.max : null,
            ]
          : [null, null];

        this.rangeYears = data.rangeYears
          ? [
              typeof data.rangeYears.min !== "undefined" ? data.rangeYears.min : null,
              typeof data.rangeYears.max !== "undefined" ? data.rangeYears.max : null,
            ]
          : [null, null];

        this.rangePower = data.rangePower
          ? [
              typeof data.rangePower.min !== "undefined" ? data.rangePower.min : null,
              typeof data.rangePower.max !== "undefined" ? data.rangePower.max : null,
            ]
          : [null, null];

        this.typeDrive = !isNaN(parseInt(data.typeDrive)) ? data.typeDrive : -1;
        this.customerRating =
          !isNaN(parseInt(data.customerRating)) && 6 > parseInt(data.customerRating) > 0
            ? data.customerRating
            : 0;

        this.enginCapacity = data.enginCapacity
          ? [
              typeof data.enginCapacity.min !== "undefined"
                ? data.enginCapacity.min
                : null,
              typeof data.enginCapacity.max !== "undefined"
                ? data.enginCapacity.max
                : null,
            ]
          : [null, null];

        console.log("filters load from store done");
        this.isShowFilters = true;
      } else {
        this.submitFilter();
        this.isShowFilters = false;
      }
    },

    submitFilter() {
      if (this.isShowFilters === false) {
        return;
      }

      this.dataMotoFilter = {};

      // Добавляем тип мотоцикла
      this.dataMotoFilter["motoTypes"] = [];
      if (this.motoTypes.length > 0) {
        this.motoTypes.forEach((element) => {
          if (element && !this.dataMotoFilter["motoTypes"].includes(element)) {
            this.dataMotoFilter["motoTypes"].push(element);
          }
        });
      }

      // Добавляем брэнд мотоцикла
      this.dataMotoFilter["motoBrands"] = [];
      if (this.motoBrands.length > 0) {
        this.motoBrands.forEach((element) => {
          if (element && !this.dataMotoFilter["motoBrands"].includes(element)) {
            this.dataMotoFilter["motoBrands"].push(element);
          }
        });
      }

      // Добавляем города для фильтрации обьявлений по месту продажи
      this.dataMotoFilter["city"] = this.cities.length > 0 ? this.cities : [];

      // Добавляем тип продавца по умолчанию не фильтровать
      this.dataMotoFilter["typeOffer"] = parseInt(this.typeOffer);

      // Добавляем фильтр по цене минимум максимум
      this.dataMotoFilter["rangePrice"] = {
        min: this.rangePrice[0],
        max: this.rangePrice[1],
      };

      // Добавляем фильтр по году выпуска минимум максимум
      this.dataMotoFilter["rangeYears"] = {
        min: this.rangeYears[0],
        max: this.rangeYears[1],
      };

      // Добавляем фильтр по мощности двигателя минимум максимум
      this.dataMotoFilter["rangePower"] = {
        min: this.rangePower[0],
        max: this.rangePower[1],
      };

      // Добавляем фильтр привода по умолчанию не фильтровать
      this.dataMotoFilter["typeDrive"] = parseInt(this.typeDrive);

      // Добавляем фильтр рэйтинга продавца
      this.dataMotoFilter["customerRating"] =
        !isNaN(parseInt(this.customerRating)) && 6 > parseInt(this.customerRating) > 0
          ? this.customerRating
          : 0;

      // Добавляем фильтр по обьему двигателя минимум максимум
      this.dataMotoFilter["enginCapacity"] = {
        min: this.enginCapacity[0],
        max: this.enginCapacity[1],
      };

      // Сохраняем фильтры в store
      this.$store.dispatch("addDataMotoFilter", this.dataMotoFilter);
      console.log(this.dataMotoFilter);

      // Сохраняем фильтры в store для тестового
      this.$store.dispatch("addTestFilter", this.dataMotoFilter);
    },
  },
};
</script>

<style scoped></style>

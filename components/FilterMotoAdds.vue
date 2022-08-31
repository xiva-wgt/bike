<template>
  <v-container>
    <v-bottom-sheet v-model="sheet" scrollable v-show="dataFilter !== null">
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
        >
          {{ dataFilter.nameBtn1 }}
        </v-btn>
      </template>

      <v-sheet>
        <v-card outlined>
          <div class="row">
            <v-btn
              @click="submitFilter"
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
                  v-model="valTypMoto"
                  :items="selTypMoto"
                  chips
                  label="Types models"
                  multiple
                  hide-no-data
                  hide-details
                  solo-inverted
                  flat
                  class="mx-4"
                >
                  <template
                    v-slot:selection="{ attrs, item, select, selected }"
                  >
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
                  v-model="valBrandMoto"
                  :items="selBrandMoto"
                  chips
                  label="Brands auto enterprise"
                  multiple
                  hide-no-data
                  hide-details
                  solo-inverted
                  flat
                  class="mx-4"
                >
                  <template
                    v-slot:selection="{ attrs, item, select, selected }"
                  >
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
                  v-model="valCity"
                  :loading="loading"
                  :items="selCity"
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
                  <template
                    v-slot:selection="{ attrs, item, select, selected }"
                  >
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
                <v-btn-toggle v-model="type_offer" mandatory>
                  <v-col
                    ><v-btn :color="type_offer == 0 ? 'yellow' : 'gray'"
                      ><v-icon
                        v-text="type_offer == 0 ? 'mdi-check-outline' : ''"
                      ></v-icon>
                      All
                    </v-btn></v-col
                  >
                  <v-col
                    ><v-btn :color="type_offer == 1 ? 'yellow' : 'gray'"
                      ><v-icon
                        v-text="type_offer == 1 ? 'mdi-check-outline' : ''"
                      ></v-icon>
                      Person
                    </v-btn></v-col
                  >
                  <v-col
                    ><v-btn :color="type_offer == 2 ? 'yellow' : 'gray'"
                      ><v-icon
                        v-text="type_offer == 2 ? 'mdi-check-outline' : ''"
                      ></v-icon>
                      Company
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
                    @change="$set(rangePrice, 0, $event)"
                    :readonly="!isEditing"
                    :hint="!isEditing ? 'Edit Min' : 'Save Min'"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :value="rangePrice[1]"
                    label="Max"
                    outlined
                    dense
                    @change="$set(rangePrice, 1, $event)"
                    :readonly="!isEditing"
                    :hint="!isEditing ? 'Edit Max' : 'Save Max'"
                    persistent-hint
                  >
                    <template v-slot:append-outer>
                      <v-icon
                        :key="`icon-${isEditing}`"
                        :color="isEditing ? 'success' : 'info'"
                        @click="isEditing = !isEditing"
                        v-text="
                          isEditing
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
                    @change="$set(rangeYears, 0, $event)"
                    :readonly="!isEditing2"
                    :hint="!isEditing2 ? 'Edit Min' : 'Save Min'"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :value="rangeYears[1]"
                    label="Max"
                    outlined
                    dense
                    @change="$set(rangeYears, 1, $event)"
                    :readonly="!isEditing2"
                    :hint="!isEditing2 ? 'Edit Max' : 'Save Max'"
                    persistent-hint
                  >
                    <template v-slot:append-outer>
                      <v-icon
                        :key="`icon-${isEditing2}`"
                        :color="isEditing2 ? 'success' : 'info'"
                        @click="isEditing2 = !isEditing2"
                        v-text="
                          isEditing2
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
                <template>
                  <v-select
                    v-model="valEngCapacity"
                    :items="selEngCapacity"
                    chips
                    label="Engine capacity cm3"
                    hide-no-data
                    hide-details
                    solo-inverted
                    class="mx-4"
                  >
                    <template
                      v-slot:selection="{ attrs, item, select, selected }"
                    >
                      <v-chip
                        v-bind="attrs"
                        :input-value="selected"
                        close
                        @click="select"
                        @click:close="removeEngCapacity(item)"
                      >
                        <strong>{{ item }}</strong
                        >&nbsp;
                      </v-chip>
                    </template>
                  </v-select>
                </template>
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
                    @change="$set(rangePower, 0, $event)"
                    :readonly="!isEditing3"
                    :hint="!isEditing3 ? 'Edit Min' : 'Save Min'"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :value="rangePower[1]"
                    label="Max"
                    outlined
                    dense
                    @change="$set(rangePower, 1, $event)"
                    :readonly="!isEditing3"
                    :hint="!isEditing3 ? 'Edit Max' : 'Save Max'"
                    persistent-hint
                  >
                    <template v-slot:append-outer>
                      <v-icon
                        :key="`icon-${isEditing3}`"
                        :color="isEditing3 ? 'success' : 'info'"
                        @click="isEditing3 = !isEditing3"
                        v-text="
                          isEditing3
                            ? 'mdi-check-outline'
                            : 'mdi-circle-edit-outline'
                        "
                      ></v-icon>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-card-title>Plus Details</v-card-title>
              <v-row class="pa-2 mx-4">
                <v-btn-toggle v-model="plus_details">
                  <v-col
                    ><v-btn :color="plus_details == 0 ? 'yellow' : 'gray'"
                      ><v-icon
                        v-text="plus_details == 0 ? 'mdi-check-outline' : ''"
                      ></v-icon>
                      Chain
                    </v-btn></v-col
                  >
                  <v-col
                    ><v-btn :color="plus_details == 1 ? 'yellow' : 'gray'"
                      ><v-icon
                        v-text="plus_details == 1 ? 'mdi-check-outline' : ''"
                      ></v-icon>
                      Cardan
                    </v-btn></v-col
                  >
                  <v-col
                    ><v-btn :color="plus_details == 2 ? 'yellow' : 'gray'"
                      ><v-icon
                        v-text="plus_details == 2 ? 'mdi-check-outline' : ''"
                      ></v-icon>
                      Donor
                    </v-btn></v-col
                  >
                </v-btn-toggle>
              </v-row>

              <v-card-title>
                Customer Rating
                <v-rating
                  v-model="rating"
                  class="ml-2 mb-2"
                  background-color="warning lighten-3"
                  color="warning"
                  dense
                >
                </v-rating>
              </v-card-title>
              <template>
                <v-select
                  v-model="valCustRating"
                  :items="selCustRating"
                  chips
                  label="Customer Rating"
                  append-icon="mdi-star"
                  hide-no-data
                  hide-details
                  solo-inverted
                  class="mx-4"
                >
                  <template
                    v-slot:selection="{ attrs, item, select, selected }"
                  >
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      close
                      @click="select"
                      @click:close="removeCustRating(item)"
                    >
                      <v-icon left small>mdi-star</v-icon>
                      <strong> {{ item }} </strong>&nbsp;
                    </v-chip>
                  </template>
                </v-select>
              </template>
            </div>
          </div>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
export default {
  props: ["dataFilter"],

  data() {
    return {
      Object: true,
      Array: true,

      valTypMoto: [],
      valBrandMoto: [],
      selEngCapacity: [
        50, 100, 125, 150, 200, 250, 300, 350, 400, 600, 650, 700, 750, 800,
        900, 1000, 1200, 1300, 1400, 1500, 1600, 1800,
      ],
      valEngCapacity: [],
      selCustRating: [
        "1 & above",
        "2 & above",
        "3 & above",
        "4 & above",
        "5 stars",
      ],
      valCustRating: [],
      rating: null,

      valCity: [],
      loading: false,
      tagCity: [],
      searchCities: null,

      type_offer: 0,

      plus_details: null,

      sheet: false,

      isEditing: false,
      rangePrice: [null, null],
      isEditing2: false,
      rangeYears: [null, null],
      isEditing3: false,
      rangePower: [null, null],
      rangeMileage: [null, null],
      minMileage: 100,
      maxMileage: 999999,

      dataMotoFilter: [],
      testFilter: [],
    };
  },
  computed: {
    allMotoBrands() {
      return this.$store.state.motoBrands;
    },
    selBrandMoto() {
      let motoBrandsList = [];
      this.$store.state.motoBrands.map((item) =>
        motoBrandsList.push(item.name)
      );
      return motoBrandsList;
    },
    allMotoTypes() {
      return this.$store.state.motoTypes;
    },
    selTypMoto() {
      let motoTypesList = [];
      this.allMotoTypes.map((item) => motoTypesList.push(item.name));
      return motoTypesList;
    },
    allCities() {
      return this.$store.state.cities;
    },
    selCity() {
      let citiesList = [];
      this.allCities.map((item) => citiesList.push(item.name));
      return citiesList;
    },
  },

  watch: {
    searchCities(val) {
      val && val !== this.select && this.querySelections(val);
    },
    rating() {
      if (this.rating > 0) {
        this.valCustRating = this.selCustRating[this.rating - 1];
      } else {
        this.valCustRating = [];
      }
    },
    valCustRating() {
      if (this.valCustRating.length > 0) {
        this.rating =
          this.selCustRating.findIndex((i) => i == this.valCustRating) + 1;
      } else {
        this.rating = null;
      }
    },
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.tagCity = this.selCity.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },

    removeEngCapacity(item) {
      this.valEngCapacity = [];
    },
    removeTypes(item) {
      this.valTypMoto.splice(this.valTypMoto.indexOf(item), 1);
      this.valTypMoto = [...this.valTypMoto];
    },
    removeBrandMoto(item) {
      this.valBrandMoto.splice(this.valBrandMoto.indexOf(item), 1);
      this.valBrandMoto = [...this.valBrandMoto];
    },

    removeCustRating(item) {
      this.valCustRating = [];
    },
    removeCity(item) {
      this.valCity = [];
    },
    addDataMotoFilter() {
      this.$store.dispatch("data_s/addDataMotoFilter", this.dataMotoFilter);
      console.log("filters save to store done");
    },
    addTestFilter() {
      this.$store.dispatch("data_s/addTestFilter", this.testFilter);
      console.log("test filter save");
    },
    submitFilter() {
      this.sheet = false;
      this.dataMotoFilter = [];
      if (this.valTypMoto.length > 0) {
        for (let i = 0; i < this.valTypMoto.length; i++) {
          this.dataMotoFilter.push(this.valTypMoto[i]);
        }
      }
      if (this.valBrandMoto.length > 0) {
        for (let i = 0; i < this.valBrandMoto.length; i++) {
          this.dataMotoFilter.push(this.valBrandMoto[i]);
        }
      }
      if (this.valCity.length > 0) {
        this.dataMotoFilter.push(this.valCity);
      }
      if (this.type_offer == 0) {
        this.dataMotoFilter.push("All Offers");
      }
      if (this.type_offer == 1) {
        this.dataMotoFilter.push("Person Offer");
      }
      if (this.type_offer == 2) {
        this.dataMotoFilter.push("Company Offers");
      }
      if (this.rangePrice[0] !== null) {
        this.dataMotoFilter.push("Цены от:" + this.rangePrice[0]);
      }
      if (this.rangePrice[1] !== null) {
        this.dataMotoFilter.push("Цены до:" + this.rangePrice[1]);
      }
      if (this.rangeYears[0] !== null) {
        this.dataMotoFilter.push("Год выпуска от:" + this.rangeYears[0]);
      }
      if (this.rangeYears[1] !== null) {
        this.dataMotoFilter.push("Год выпуска до:" + this.rangeYears[1]);
      }
      if (this.valEngCapacity.length > 0) {
        this.dataMotoFilter.push(this.valEngCapacity);
      }
      if (this.rangePower[0] !== null) {
        this.dataMotoFilter.push("Мощностью от:" + this.rangePower[0]);
      }
      if (this.rangePower[1] !== null) {
        this.dataMotoFilter.push("Мощностью до:" + this.rangePower[1]);
      }
      if (this.plus_details == 0) {
        this.dataMotoFilter.push("Chain drive");
      }
      if (this.plus_details == 1) {
        this.dataMotoFilter.push("Cardan drive");
      }
      if (this.plus_details == 2) {
        this.dataMotoFilter.push("Moto Donor");
      }
      if (this.valCustRating.length > 0) {
        this.dataMotoFilter.push(this.valCustRating);
      }

      //: this.dataMotoFilter = [ this.valTypMoto, this.valBrandMoto, this.valCity, this.type_offer, this.rangePrice, this.rangeYears, this.valEngCapacity, this.rangePower, this.plus_details, this.valCustRating];
      this.addDataMotoFilter(this.dataMotoFilter);
      console.log(this.dataMotoFilter);

      let testRangePrice = this.rangePrice.map(parseFloat);
      console.log("result is", testRangePrice);
      this.testFilter = [this.valBrandMoto, this.valCity, testRangePrice];
      this.addTestFilter(this.testFilter);
      console.log(this.testFilter);
    },
  },
};
</script>

<style scoped></style>
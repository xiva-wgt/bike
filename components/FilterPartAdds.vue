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
                  Чувак! Следи за своей лошадкой! Найди запчасти!
                </v-tooltip>
              </v-row>
              <template>
                <v-select
                  v-model="valTypParts"
                  :items="selTypParts"
                  chips
                  label="Types parts"
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

              <v-card-title>Terms delivery</v-card-title>
              <v-row class="pa-2 mx-4" dense>
                <v-col cols="12" sm="5">
                  <v-text-field
                    :value="termsDelivery[0]"
                    label="Min"
                    outlined
                    dense
                    @change="$set(termsDelivery, 0, $event)"
                    :readonly="!isEditing2"
                    :hint="!isEditing2 ? 'Edit Min' : 'Save Min'"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :value="termsDelivery[1]"
                    label="Max"
                    outlined
                    dense
                    @change="$set(termsDelivery, 1, $event)"
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
              <v-card-title>Way Getting</v-card-title>
              <v-row class="pa-2 mx-4">
                <v-btn-toggle v-model="way_getting">
                  <v-col
                    ><v-btn :color="way_getting == 0 ? 'yellow' : 'gray'"
                      ><v-icon
                        v-text="way_getting == 0 ? 'mdi-check-outline' : ''"
                      ></v-icon>
                      Self
                    </v-btn></v-col
                  >
                  <v-col
                    ><v-btn :color="way_getting == 1 ? 'yellow' : 'gray'"
                      ><v-icon
                        v-text="way_getting == 1 ? 'mdi-check-outline' : ''"
                      ></v-icon>
                      Delivery
                    </v-btn></v-col
                  >
                  <v-col
                    ><v-btn :color="way_getting == 2 ? 'yellow' : 'gray'"
                      ><v-icon
                        v-text="way_getting == 2 ? 'mdi-check-outline' : ''"
                      ></v-icon>
                      Postamat
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
      sheet: false,

      valTypParts: [],
      valBrandMoto: [],
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

      isEditing: false,
      rangePrice: [null, null],
      isEditing2: false,
      termsDelivery: [null, null],

      type_offer: 0,
      way_getting: null,

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
    allPartsTypes() {
      return this.$store.state.partsTypes;
    },
    selTypParts() {
      let partsTypesList = [];
      this.allPartsTypes.map((item) => partsTypesList.push(item.name));
      return partsTypesList;
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

    removeTypes(item) {
      this.valTypParts.splice(this.valTypParts.indexOf(item), 1);
      this.valTypParts = [...this.valTypParts];
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
/*
    addDataMotoFilter() {
      this.$store.dispatch("data_s/addDataMotoFilter", this.dataMotoFilter);
      console.log("filters save to store done");
    },
    addTestFilter() {
      this.$store.dispatch("data_s/addTestFilter", this.testFilter);
      console.log("test filter save");
    },
*/
    submitFilter() {
      this.sheet = false;

      this.dataMotoFilter = [];
      if (this.valTypParts.length > 0) {
        for (let i = 0; i < this.valTypParts.length; i++) {
          this.dataMotoFilter.push(this.valTypParts[i]);
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
      if (this.termsDelivery[0] !== null) {
        this.dataMotoFilter.push(
          "Срок доставки от: " + this.termsDelivery[0] + " дней"
        );
      }
      if (this.termsDelivery[1] !== null) {
        this.dataMotoFilter.push(
          "Срок доставки до: " + this.termsDelivery[1] + " дней"
        );
      }
      if (this.way_getting == 0) {
        this.dataMotoFilter.push("Self");
      }
      if (this.way_getting == 1) {
        this.dataMotoFilter.push("Delivery");
      }
      if (this.way_getting == 2) {
        this.dataMotoFilter.push("Postamat");
      }
      if (this.valCustRating.length > 0) {
        this.dataMotoFilter.push(this.valCustRating);
      }

      //: this.dataMotoFilter = [ this.valTypParts, this.valBrandMoto, this.valCity, this.type_offer, this.rangePrice, this.termsDelivery, this.way_getting, this.valCustRating];
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
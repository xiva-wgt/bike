<!-- src/components/List.vue -->
<template>
  <v-container fluid fill-height>
    <!-- Создаем контейнер внутри которого и будут элементы компонента -->

    <v-row>
      <!-- В это row выводим заголовок компонента -->
      <v-col>
        <h2 class="text-center text-h4 py-2">List adds of MotoLifes</h2>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" dense>
      <v-col class="d-flex" cols="12" sm="4">
        <v-select
          v-model="select"
          :items="options"
          label="Sort Adds"
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>

    <v-row justify="center" align="start">
      <v-col md="4" v-for="item in addsList" :key="item.id">
        <ItemMotoList v-if="item.classifiedTypeId == 0" :item="item" />

        <ItemPartList v-if="item.classifiedTypeId == 1" :item="item" />

        <ItemServiceList v-if="item.classifiedTypeId == 2" :item="item" />

        <ItemEventList v-if="item.classifiedTypeId == 3" :item="item" />
      </v-col>
    </v-row>

    <BottomNav
      @motoList="motoList"
      @partsList="partsList"
      @serviceList="serviceList"
      @eventsList="eventsList"
    />
  </v-container>
</template>

<script>
export default {
  data: () => ({
    Array: true,
    select: "Popularity",
    options: [
      "Default",
      "Popularity",
      "Relevance",
      "Price: Low to High",
      "Price: High to Low",
    ],
    addsList: [],
    motoAdds: [],
    partsAdds: [],
    serviceAdds: [],
    eventsAdds: [],
  }),

  mounted: function () {
    this.$store.dispatch("fetchMotoBrands");
    this.$store.dispatch("fetchMotoTypes");
    this.$store.dispatch("fetchPartsTypes");
    this.$store.dispatch("fetchServiceTypes");
    this.$store.dispatch("fetchEventTypes");
    this.$store.dispatch("fetchMotoDrives");
    this.$store.dispatch("fetchCities");
    this.$store.dispatch("fetchOfferTypes");
    console.log("lists mounted");
  },

  async created() {
    console.log("call motoList start on created");
    await this.motoList();
    console.log("call motoList finish on created");
  },

  methods: {
    async getClassified(classifiedType, storeResult) {
      classifiedType = classifiedType ? classifiedType : 0;
      storeResult = storeResult ? storeResult : [];
      const url = new URL("http://localhost:3004/classifieds");
      url.searchParams.append("_expand", "user");
      if (classifiedType === 0) {
        url.searchParams.append("_expand", "motoModel");
      }
      url.searchParams.append("classifiedTypeId", classifiedType);
      console.log(
        "getClassified call with classifiedType " +
          classifiedType +
          " and url set " +
          url
      );
      let urlString = url.toString();
      try {
        const response = await this.$axios.get(urlString);
        let data = response.data;
        if (classifiedType === 0) {
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
        }
        data.map((item) => {
          let isNew = true;
          storeResult.map((classifiedItem) => {
            if (item.id === classifiedItem.id) {
              isNew = false;
            }
          });
          if (isNew) {
            storeResult.push(item);
          }
        });
      } catch (error) {
        console.log(error);
      }
      console.log(
        "getClassified call with classifiedType " +
          classifiedType +
          " result " +
          JSON.stringify(storeResult)
      );
      return storeResult;
    },
    async motoList() {
      this.motoAdds = await this.getClassified(0, this.motoAdds);
      this.addsList = this.motoAdds;
      console.log("motoList get " + this.addsList.length + " classified.");
    },
    async partsList() {
      this.partsAdds = await this.getClassified(1, this.partsAdds);
      this.addsList = this.partsAdds;
      console.log("partsList get " + this.addsList.length + " classified.");
    },
    async serviceList() {
      this.serviceAdds = await this.getClassified(2, this.serviceAdds);
      this.addsList = this.serviceAdds;
      console.log("serviceList get " + this.addsList.length + " classified.");
    },
    async eventsList() {
      this.eventsAdds = await this.getClassified(3, this.eventsAdds);
      this.addsList = this.eventsAdds;
      console.log("eventsAdds get " + this.addsList.length + " classified.");
    },
  },

  /*
  computed: {
    addsList() {
    let motoAdds = this.$store.dispatch("fetchMotoClassifieds");
    return motoAdds;
    console.log("lists mounted");
    },

    async motoAdds() {

      this.loading = true;
      let filters = this.$store.state.testFilter;

      const url = new URL("http://localhost:3004/classifieds");
      // добавляем чтобы user classifiedType motoModel были запрошены и добавлены в ответ
      url.searchParams.append("userId");
      url.searchParams.append("_expand", "motoModel");
      // Мотоциклы тип 0
      url.searchParams.append("classifiedTypeId", "0");
      return url;
    },
    getDataMotoFilter() {
      return this.$store.state.dataMotoFilter;
    },
    getTestFilter(){
      return this.$store.state.testFilter;
    },
  },
  */
};
</script>

<style></style>
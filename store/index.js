export const state = () => ({
  dataMotoFilter: {},
  testFilter: {},
  motoClassifiedsPending: 0,
  motoClassifieds: [],
  motoTypesPending: 0,
  motoTypes: [],
  partsTypesPending: 0,
  partsTypes: [],
  serviceTypesPending: 0,
  serviceTypes: [],
  eventTypesPending: 0,
  eventTypes: [],
  motoBrandsPending: 0,
  motoBrands: [],
  motoDrivesPending: 0,
  motoDrives: [],
  citiesPending: 0,
  cities: [],
  offerTypesPending: 0,
  offerTypes: [],
});

export const getters = {
  getDataMotoFilter: (state) => {
    return state.dataMotoFilter;
  },
  getTestFilter: (state) => {
    return state.testFilter;
  },
};

export const mutations = {
  ADD_DATA_MOTO_FILTER(state, dataMotoFilter) {
    state.dataMotoFilter = dataMotoFilter;
  },
  ADD_TEST_FILTER(state, testFilter) {
    state.testFilter = testFilter;
  },
  SET_MOTO_CLASSIFIEDS(state, data) {
    state.motoClassifieds = data;
  },
  SET_MOTO_CLASSIFIEDS_PENDING(state, data) {
    state.motoClassifiedsPending = data;
  },
  SET_MOTO_TYPES(state, data) {
    state.motoTypes = data;
  },
  SET_MOTO_TYPES_PENDING(state, data) {
    state.motoTypesPending = data;
  },
  SET_PARTS_TYPES(state, data) {
    state.partsTypes = data;
  },
  SET_PARTS_TYPES_PENDING(state, data) {
    state.partsTypesPending = data;
  },
  SET_SERVICE_TYPES(state, data) {
    state.serviceTypes = data;
  },
  SET_SERVICE_TYPES_PENDING(state, data) {
    state.serviceTypesPending = data;
  },
  SET_EVENT_TYPES(state, data) {
    state.eventTypes = data;
  },
  SET_EVENT_TYPES_PENDING(state, data) {
    state.eventTypesPending = data;
  },
  SET_MOTO_BRANDS(state, data) {
    state.motoBrands = data;
  },
  SET_MOTO_BRANDS_PENDING(state, data) {
    state.motoBrandsPending = data;
  },
  SET_MOTO_DRIVES(state, data) {
    state.motoDrives = data;
  },
  SET_MOTO_DRIVES_PENDING(state, data) {
    state.motoDrivesPending = data;
  },
  SET_CITIES(state, data) {
    state.cities = data;
  },
  SET_CITIES_PENDING(state, data) {
    state.citiesPending = data;
  },
  SET_OFFER_TYPES(state, data) {
    state.offerTypes = data;
  },
  SET_OFFER_TYPES_PENDING(state, data) {
    state.offerTypesPending = data;
  },
};

export const actions = {
  addDataMotoFilter(context, dataMotoFilter) {
    context.commit("ADD_DATA_MOTO_FILTER", dataMotoFilter);
  },
  addTestFilter(context, testFilter) {
    context.commit("ADD_TEST_FILTER", testFilter);
  },

  async fetchMotoClassifieds({ commit, state }) {
    if (state.motoClassifieds.length === 0 && state.motoClassifiedsPending === 0) {
      commit("SET_MOTO_CLASSIFIEDS_PENDING", 1);
      try {
        const response = await this.$axios.get(
          "http://localhost:3004/classifieds"
        );
        commit("SET_MOTO_CLASSIFIEDS", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
      commit("SET_MOTO_CLASSIFIEDS_PENDING", 0);
    }
  },
  async fetchMotoTypes({ commit, state }) {
    if (state.motoTypes.length === 0 && state.motoTypesPending === 0) {
      commit("SET_MOTO_TYPES_PENDING", 1);
      try {
        const response = await this.$axios.get(
          "http://localhost:3004/motoTypes"
        );
        commit("SET_MOTO_TYPES", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
      commit("SET_MOTO_TYPES_PENDING", 0);
    }
  },
  async fetchPartsTypes({ commit, state }) {
    if (state.partsTypes.length === 0 && state.partsTypesPending === 0) {
      commit("SET_PARTS_TYPES_PENDING", 1);
      try {
        const response = await this.$axios.get(
          "http://localhost:3004/partsTypes"
        );
        commit("SET_PARTS_TYPES", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
      commit("SET_PARTS_TYPES_PENDING", 0);
    }
  },
  async fetchServiceTypes({ commit, state }) {
    if (state.serviceTypes.length === 0 && state.serviceTypesPending === 0) {
      commit("SET_SERVICE_TYPES_PENDING", 1);
      try {
        const response = await this.$axios.get(
          "http://localhost:3004/serviceTypes"
        );
        commit("SET_SERVICE_TYPES", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
      commit("SET_SERVICE_TYPES_PENDING", 0);
    }
  },
  async fetchEventTypes({ commit, state }) {
    if (state.eventTypes.length === 0 && state.eventTypesPending === 0) {
      commit("SET_EVENT_TYPES_PENDING", 1);
      try {
        const response = await this.$axios.get(
          "http://localhost:3004/eventTypes"
        );
        commit("SET_EVENT_TYPES", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
      commit("SET_EVENT_TYPES_PENDING", 0);
    }
  },
  async fetchMotoBrands({ commit, state }) {
    if (state.motoBrands.length === 0 && state.motoBrandsPending === 0) {
      commit("SET_MOTO_BRANDS_PENDING", 1);
      try {
        const response = await this.$axios.get(
          "http://localhost:3004/motoBrands"
        );
        commit("SET_MOTO_BRANDS", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
      commit("SET_MOTO_BRANDS_PENDING", 0);
    }
  },
  async fetchMotoDrives({ commit, state }) {
    if (state.motoDrives.length === 0 && state.motoDrivesPending === 0) {
      commit("SET_MOTO_DRIVES_PENDING", 1);
      try {
        const response = await this.$axios.get(
          "http://localhost:3004/motoDrives"
        );
        commit("SET_MOTO_DRIVES", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
      commit("SET_MOTO_DRIVES_PENDING", 0);
    }
  },
  async fetchOfferTypes({ commit, state }) {
    if (state.offerTypes.length === 0 && state.offerTypesPending === 0) {
      commit("SET_OFFER_TYPES_PENDING", 1);
      try {
        const response = await this.$axios.get(
          "http://localhost:3004/offerTypes"
        );
        commit("SET_OFFER_TYPES", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
      commit("SET_OFFER_TYPES_PENDING", 0);
    }
  },
  async fetchCities({ commit, state }) {
    if (state.cities.length === 0 && state.citiesPending === 0) {
      commit("SET_CITIES_PENDING", 1);
      try {
        const response = await this.$axios.get("http://localhost:3004/cities");
        commit("SET_CITIES", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
      commit("SET_CITIES_PENDING", 0);
    }
  },
};

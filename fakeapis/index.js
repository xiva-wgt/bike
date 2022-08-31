const cities = require("./cities.json");
const users = require("./users.json");
const motoBrands = require("./motoBrands.json");
const motoTypes = require("./motoTypes.json");
const partsTypes = require("./partsTypes.json");
const serviceTypes = require("./serviceTypes.json");
const eventTypes = require("./eventTypes.json");
const motoDrives = require("./motoDrives.json");
const motoModels = require("./motoModels.json");
const classifiedTypes = require("./classifiedTypes.json");
const classifieds = require("./classifieds.json");
const offerTypes = require("./offerTypes.json");
// offerTypes

module.exports = () => ({
  cities: cities.data,
  users: users.data,
  motoBrands: motoBrands.data,
  motoTypes: motoTypes.data,
  partsTypes: partsTypes.data,
  serviceTypes: serviceTypes.data,
  eventTypes: eventTypes.data,
  motoDrives: motoDrives.data,
  motoModels: motoModels.data,
  classifiedTypes: classifiedTypes.data,
  classifieds: classifieds.data,
  offerTypes: offerTypes.data,
});

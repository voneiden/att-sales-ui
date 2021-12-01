// This is meant to be run locally with json-server package
// https://github.com/typicode/json-server

const apartments = require("./apartments.json");
const projects = require("./projects.json");

module.exports = () => ({
  apartments,
  projects,
});

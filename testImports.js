exports.app = require("./app");
exports.db = require("./db/connection");
exports.seed = require("./db/seeds/seed");
exports.data = require("./db/data/test-data");
exports.request = require("supertest");

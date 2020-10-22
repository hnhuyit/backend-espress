const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2")

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");
db.tutorials = require("./tutorial");
db.products = require("./product");



// db.tutorials = require("./tutorial")(mongoose, mongoosePaginate);
// db.products = require("./product")(mongoose, mongoosePaginate);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
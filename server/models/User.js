const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user"
  },
}, {
  timestamps: true
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("users", UserSchema);

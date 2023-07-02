const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    checkin_date: {
      type: String,
    },
    checkout_date: {
      type: String,
    },
    persons: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      }
  },
);
module.exports = mongoose.model("orders", OrderSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Menu = new Schema(
  {
    Title: {
      type: String,
    },
    details: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);
const PostSchema = new Schema({
Title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  price: {
    type: Number,
    required: true
  },
  menu: {
    type: [Menu],
    default: []
  }
});

module.exports = mongoose.model('posts', PostSchema);
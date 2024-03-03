  const mongoose = require("mongoose");

  const userSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 32,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 512,
    },
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 32,
    },
    lastname: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    profileImgUrl: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
      minlength: 7,
      maxlength: 16,
    },
    residency: {
      country: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
    },
    birthday:{
      type:Date,
      required:false,
    },
    biography:{
      type:String,
      minLength:1,
      maxLength:2056,
      required:false,
    },
    role: {
      type: String,
      default: "normal",
    },
    events: [{
      type:mongoose.Schema.ObjectId,
      required:false,
    }]
  });

  const User = mongoose.model("User", userSchema);

  module.exports = User;

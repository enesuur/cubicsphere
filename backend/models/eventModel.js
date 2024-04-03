const mongoose = require("mongoose");
/* 
If error arrise when creating an event check those part.
minLenght
maxLength
required
type
*/
const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 64
    },
    description: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 5000
    },
    startDate: {
      type: Date,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    address: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false
    },
    quota: {
      type: Number,
      required: false
    },
    attendants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      }
    ],
    organizer: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    eventCoverImgUrl: {
      type: String,
      required: false
    },
    isOnline: {
      type: Boolean,
      required: true,
      default: false
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 32
    }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;

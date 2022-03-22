const mongoose = require("mongoose");

const matchteamSchema = new mongoose.Schema(
  {
    matchName: {
      type: String,
    },
    matchDate: {
      type: String,
      default: new Date().toLocaleDateString()
    },
    matchTime: {
      type: String,
      default: new Date().toLocaleTimeString()
    }
    // teams: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("matchteam", matchteamSchema);

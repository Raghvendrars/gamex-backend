const mongoose = require("mongoose");

const matchteamSchema = new mongoose.Schema(
  {
    matchName: {
      type: String,
    },
    teams: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("matchteam", matchteamSchema);

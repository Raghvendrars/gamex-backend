const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    matchId: {
      type: String,
    },
    matchName: {
      type: String,
    },
    teamId: {
      type: String,
    },
    playerName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("playername", playerSchema);

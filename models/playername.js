const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
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

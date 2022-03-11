const mongoose = require("mongoose");

const playerteamSchema = new mongoose.Schema(
  {
    playerId: {
      type: String,
    },
    teamId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("playerteam", playerteamSchema);

const mongoose = require("mongoose");

const checkpointSchema = new mongoose.Schema(
  {
    playerId: {
      type: String,
    },
    selectedPlayer: {
      type: String,
    },
    actionId: {
      type: String,
    },
    selectedAction: {
      type: String,
    },
    effectedPlayerId: {
      type: String,
    },
    selectedEffectedPlayer: {
      type: String,
    },
    MatchId: {
      type: String,
    },
    MATCHname: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("checkpoint", checkpointSchema);

const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
    },
    matchId: {
      type: String,
    },
    matchName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("teamname", teamSchema);

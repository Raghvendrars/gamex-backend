const mongoose = require("mongoose")

const selectedPlayerSchema = new mongoose.Schema(
    {
      matchId: {
        type: String,
      },
      matchName: {
        type: String,
      },
      signInUserId: {
        type: String,
      },
      signInUser: {
        type: String,
      },
      playerNameOne: {
        type: String,
      },
      playerNameTwo: {
        type: String,
      },
      playerNameThree: {
        type: String,
      },
      playerNameFour: {
        type: String,
      },
      playerNameOneID: {
        type: String,
      },
      playerNameTwoID: {
        type: String,
      },
      playerNameThreeID: {
        type: String,
      },
      playerNameFourID: {
        type: String,
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("selectedFPlayers", selectedPlayerSchema);
  
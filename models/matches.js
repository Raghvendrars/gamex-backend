const mongoose = require("mongoose");

const matchesSchema = new mongoose.Schema(
  {
    MATCH_ID: {
      type: String
    },
    MATCH_NAME: {
      type: String
    },
    TEAMS: [
      TEAM_ID= {
        type: String
      },
      TEAM_NAME= {
        type: String
      },
      PLAYER_1= {
        type: String
      },
      PLAYER_2= {
        type: String
      },
      PLAYER_3= {
        type: String
      },
      PLAYER_4= {
        type: String
      },
    ]

    // match: {
    //   type: String,
    // },
    // teams: [
    //   (teamName = {
    //     type: String,
    //   }),
    //   (playerName1 = {
    //     type: String,
    //   }),
    //   (playerName2 = {
    //     type: String,
    //   }),
    //   (playerName3 = {
    //     type: String,
    //   }),
    //   (playerName4 = {
    //     type: String,
    //   }),
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("matches", matchesSchema);

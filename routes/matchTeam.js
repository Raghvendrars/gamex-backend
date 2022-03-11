const express = require("express");
const router = express.Router();
const matchteamModel = require("../models/matchteam");
const teamModel = require("../models/teamname");
const playerModel = require("../models/playername");

router.post("/addMatchTeam", async (req, res) => {
  var matchTeam = new matchteamModel();

  matchTeam.matchName = req.body.matchName;
  matchTeam.teams = req.body.teams;

  matchTeam.save(function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json("matchTeam name added");
    }
  });
});

router.get("/getMatchTeam", async (req, res) => {
  try {
    const matchTeamDetail = await matchteamModel.find({});
    res.status(200).json(matchTeamDetail);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all the details of a match

router.get("/getMatchByMatchId/:id", async (req, res) => {
  try {
    const matchTeamById = await matchteamModel.findById({ _id: req.params.id });
    // console.log("matchteambyid", matchTeamById)
    const teamBymatchId = await teamModel.find({ matchId: req.params.id });
    // console.log("teambymatchid",teamBymatchId);
    var teams = [];
    for (i = 0; i < teamBymatchId.length; i++) {
      const team = teamBymatchId[i];
      const playerByTeamId = await playerModel.find({ teamId: team._id });
      // console.log("player",playerByTeamId)
      teams.push({ ...team._doc, players: playerByTeamId });
    }
    // console.log("playerbyteamid",teams);
    res.status(200).json({ ...matchTeamById._doc, teams });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/updateMatchTeam/:id", async (req, res) => {
  try {
    const updateMatchTeam = await matchteamModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      }
    );
    res.status(200).json("Updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/deleteAllMatchTeam", async (req, res) => {
  matchteamModel.deleteMany({}, function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json("All match Deleted");
    }
  });
});

router.delete("/deleteMatchTeam/:id", async (req, res) => {
  const deleteMatchTeam = await matchteamModel.findById(req.params.id);
  try {
    await deleteMatchTeam.delete();
    res.status(200).json("PlayerTeam Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

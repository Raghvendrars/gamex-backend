const express = require("express");
const router = express.Router();
const playerModel = require("../models/playername");

router.post("/addPlayer", async (req, res) => {
  var playerDetail = new playerModel();

  playerDetail.teamId = req.body.teamId;
  playerDetail.playerName = req.body.playerName;
  playerDetail.playerName = req.body.playerName;
  playerDetail.playerName = req.body.playerName;
  playerDetail.playerName = req.body.playerName;

  playerDetail.save(function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json("Player Added");
    }
  });
});

router.get("/getPlayer", async (req, res) => {
  try {
    const playerallDetail = await playerModel.find({});
    res.status(200).json(playerallDetail);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getPlayerByPlayerId/:id", async (req, res) => {
  try {
    const playerDetail = await playerModel.find({ _id: req.params.id });
    res.status(200).json(playerDetail);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/updatePlayer/:id", async (req, res) => {
  try {
    const updatePlayer = await playerModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/deleteAllPlayer", async (req, res) => {
  playerModel.deleteMany({}, function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json("All Player Deleted");
    }
  });
});

router.delete("/deletePlayer/:id", async (req, res) => {
  const deletePlayer = await playerModel.findById(req.params.id);
  try {
    await deletePlayer.delete();
    res.status(200).json("Player Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

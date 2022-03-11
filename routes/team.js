const express = require("express");
const router = express.Router();
const teamnameModel = require("../models/teamname");

router.post("/addTeam", async (req, res) => {
  var teamnameDetail = new teamnameModel();

  teamnameDetail.teamName = req.body.teamName;
  teamnameDetail.matchId = req.body.matchId;
  teamnameDetail.matchName = req.body.matchName;
  console.log('team details ::',teamnameDetail,req.body)
  teamnameDetail.save(function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(teamnameDetail._id);
    }
  });
});

router.get("/getTeam", async (req, res) => {
  try {
    const teamDetail = await teamnameModel.find({});
    res.status(200).json(teamDetail);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getTeamByMatchId/:id", async (req, res) => {
  try {
    const teamByMatchId = await teamnameModel.find({ matchId: req.params.id });
    res.status(200).json(teamByMatchId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getTeamByTeamId/:id", async (req, res) => {
  try {
    const teamDetail = await teamnameModel.find({ _id: req.params.id });
    res.status(200).json(teamDetail);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/updateTeam/:id", async (req, res) => {
  try {
    const updateTeam = await teamnameModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/deleteAllTeam", async (req, res) => {
  teamnameModel.deleteMany({}, function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json("All Team Deleted");
    }
  });
});

router.delete("/deleteTeam/:id", async (req, res) => {
  const deleteTeam = await teamnameModel.findById(req.params.id);
  try {
    await deleteTeam.delete();
    res.status(200).json("Team Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

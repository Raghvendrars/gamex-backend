const express = require("express");
const router = express.Router();
const checkpointModel = require("../models/checkpoint");

router.post("/addId", async (req, res) => {
  var checkpointDetail = new checkpointModel();

  checkpointDetail.playerId = req.body.playerId;
  checkpointDetail.selectedPlayer = req.body.selectedPlayer;
  checkpointDetail.actionId = req.body.actionId;
  checkpointDetail.selectedAction = req.body.selectedAction;
  checkpointDetail.effectedPlayerId = req.body.efffectedPlayerId;
  checkpointDetail.selectedEffectedPlayer = req.body.selectedEffectedPlayer;
  checkpointDetail.MatchId = req.body.MatchId
  checkpointDetail.MATCHname = req.body.MATCHname

  checkpointDetail.save(function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json("Id Added");
    }
  });
});

router.get("/getId", async (req, res) => {
  try {
    const checkpointallDetail = await checkpointModel.find({});
    res.status(200).json(checkpointallDetail);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getDetailById/:id", async (req, res) => {
  try {
    var id = req.params.id;
    const getDetail = await checkpointModel.findById(id);
    res.status(200).json(getDetail);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/updateId/:id", async (req, res) => {
  try {
    const updateId = await checkpointModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/deleteId/:id", async (req, res) => {
  const deleteId = await checkpointModel.findById(req.params.id);
  try {
    await deleteId.delete();
    res.status(200).json("checkpoint Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

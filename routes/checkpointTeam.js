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
  checkpointDetail.MatchId = req.body.MatchId;
  checkpointDetail.MATCHname = req.body.MATCHname;

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

router.get("/getPlayersWithPoints", async (req, res) => {
  try {
    res.status(200).json(await getAllPlayerInfoByMatchId(req.query.matchId));
  } catch (err) {
    res.status(500).json(err);
  }
});

const getAllPlayerInfoByMatchId = async (matchId) => {
  const data = [];
  const matchData = await checkpointModel.find({
    MatchId: matchId,
  });
  matchData.forEach((value) => {
    value = value._doc;
    const index = data.findIndex(
      (e) => e.selectedPlayer === value.selectedPlayer
    );
    if (index === -1) {
      data.push({
        selectedPlayer: value.selectedPlayer,
        cause: [{ actionId: value.actionId, action: value.selectedAction }],
        points: 2,
      });
    } else {
      data[index] = {
        selectedPlayer: value.selectedPlayer,
        cause: [
          ...data[index].cause,
          { actionId: value.actionId, action: value.selectedAction },
        ],
        points: data[index].points + 2,
      };
    }
  });
  return data;
};

router.get("/getPlayerWithHighestAction", async (req, res) => {
  const selectedActionId = req.query.actionId;
  try {
    const data = await getAllPlayerInfoByMatchId(req.query.matchId);

    //new
    const newData = data
      .map((playerData, index) => {
        const instance = playerData.cause.reduce((prev, current) => {
          if (current.actionId === selectedActionId) {
            return prev + 1;
          } else {
            return prev;
          }
        }, 0);
        return { ...playerData, instance };
      })
      .sort((a, b) => b.instance - a.instance);

    res.status(200).json(newData[0]);
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

const express = require("express");
const router = express.Router();
const checkpointModel = require("../models/checkpoint");
const teamModel = require("../models/teamname");
const userModel = require("../models/user");
const playerModel = require("../models/playername");
const selectFModel = require("../models/selectedFPlayers")

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
  checkpointDetail.teamId = req.body.teamId;

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

router.get("/getDetailOfTeamsWithPoints", async (req, res) => {
  try {
    const data = await getAllPlayerInfoByMatchId(req.query.matchId);

    const player = []

    data.forEach((value) => {
      player.push({
        teamId: value.teamId,
        points: value.points
      })
    })

    const rd = () => {
      let res = {}
      player.forEach((item,index) => {
        if(player.indexOf(item) === index){
          if(res[item.teamId]){ 
            res[item.teamId] += item.points
          }else{
            res[item.teamId] = item.points
          }
        }
      })
      return res;
    }

    const result = rd();

    const dd = []
    for (const [teamId, points] of Object.entries(result)) {
      const teamData = await teamModel.findById(teamId);
      dd.push({
        teamName: teamData.teamName,
        points: points
      })
    }

    res.status(200).json(dd);
  } catch (err) {
    res.status(500).json(err);
  }
})

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
        teamId: value.teamId,
        playerId: value.playerId,
        selectedPlayer: value.selectedPlayer,
        cause: [{ actionId: value.actionId, action: value.selectedAction }],
        points: 2,
      });
    } else {
      data[index] = {
        teamId: value.teamId,
        playerId: value.playerId,
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

router.get("/getSpecificPlayerWithPoint", async (req, res) => {
  const selectedPlayerId = req.query.playerId;
  try {
    const data = await getAllPlayerInfoByMatchId(req.query.matchId);

    const newData = data.filter((onePlayerData) => {
      if(selectedPlayerId === onePlayerData.playerId){
        return ({selectedPlayer: onePlayerData.selectedPlayer, cause: onePlayerData.cause, points: onePlayerData.points});
      } 
    })

    res.status(200).json(newData)
  } catch (err) {
    res.status(500).json(err);
  }
})

const getDetailByUserWhoLogged = async() => {
  const allPlayer = await userModel.find({});
  allPlayer.forEach(function(allPlayer) {
    return `${allPlayer._id} :: ${allPlayer.username}`;
  })
}

router.get("/getDetailWhoLogged", async (req, res) => {
  try {
    const allPlayerLogged = await userModel.find({});
    const allD = []
    allPlayerLogged.forEach(function(allPlayerLogged) {
      allD.push({ 
        username: `${allPlayerLogged._id} :: ${allPlayerLogged.username}`
      })
    })

    const allPlayer = await playerModel.find({})
    const allP = []
    allPlayer.forEach(function(allPlayer) {
      allP.push({
        playerName: `${allPlayer._id} :: ${allPlayer.playerName}`
      })
    })

    res.status(200).json(allD)
  } catch (err) {
    res.status(500).json(err);
  }
})

const getSpecificPlayerWithPoint = async(req , res) => {
  console.log(res.locals.playerIds)
  
  let playerIds = Object.entries(res.locals.playerIds).map(([k , v])=>v)
  console.log(playerIds)
  
  try {
    const data = await getAllPlayerInfoByMatchId(req.query.matchId);

    const newData = data.filter((onePlayerData) => {
      if(playerIds.includes(onePlayerData.playerId)){
        return ({selectedPlayer: onePlayerData.selectedPlayer, cause: onePlayerData.cause, points: onePlayerData.points});
      } 
    })

    res.status(200).json(newData)
  } catch (err) {
    res.status(500).json(err);
  }
}

router.get("/getCustomDetail", async (req, res , next) => {
  try {
    const data = await selectFModel.find({})
    var last = data.length
    const playerOneID = data[last-1].playerNameOneID
    const playerTwoID = data[last-1].playerNameTwoID
    const playerThreeID = data[last-1].playerNameThreeID
    const playerFourID = data[last-1].playerNameFourID
    res.locals.playerIds = {
      playerOneID, playerTwoID, playerThreeID, playerFourID
    }
    next()
  }catch(err){
    res.status(500).json(err)
  }
  //   const specificPlayerOne = await getSpecificPlayerWithPoint({selectedPlayerId: playerOneID})

  //   res.status(200).json(specificPlayerOne) 
  // } catch (err) {
  //   res.status(500).json(err)
  // }
} , getSpecificPlayerWithPoint)















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

const express = require("express");
const router = express.Router();
const matchesModel = require("../models/matches");

router.post("/addMatchesData", async (req, res) => {
  var matchesDetail = new matchesModel();

  matchesDetail.MATCH_ID = req.body.MATCH_ID;
  matchesDetail.MATCH_NAME = req.body.MATCH_NAME;

  matchesDetail.TEAMS.TEAM_ID = req.body.TEAM_ID;
  matchesDetail.TEAMS.TEAM_NAME = req.body.TEAM_NAME;
  matchesDetail.TEAMS.PLAYER_1 = req.body.PLAYER_1;
  matchesDetail.TEAMS.PLAYER_2 = req.body.PLAYER_2;
  matchesDetail.TEAMS.PLAYER_3 = req.body.PLAYER_3;
  matchesDetail.TEAMS.PLAYER_4 = req.body.PLAYER_4;

  // var allTeam = [
  //   matchesDetail.TEAM_ID = req.body.TEAM_ID,
  //   matchesDetail.TEAM_NAME = req.body.TEAM_NAME,
  //   matchesDetail.PLAYER_1 = req.body.PLAYER_1,
  //   matchesDetail.PLAYER_2 = req.body.PLAYER_2,
  //   matchesDetail.PLAYER_3 = req.body.PLAYER_3,
  //   matchesDetail.PLAYER_4 = req.body.PLAYER_4
  // ];

  // matchesDetail.TEAMS.push(allTeam)

  console.log("matches Detail", matchesDetail);

  matchesDetail.save(function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json("All data Added");
    }
  });
});

router.get("/getMatchesData", async (req, res) => {
  try {
    const matchesallDetail = await matchesModel.find({});
    res.status(200).json(matchesallDetail);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/deleteAll", async (req, res) => {
  matchesModel.deleteMany({}, function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json("All Data Deleted");
    }
  });
});

// router.get("/matchTeam", async () => {
//   matchteamsCollections.aggregate([
//     {
//       $lookup: {
//         from: "matchTeam",
//         as: "matchTeam",
//         let: {match_id: "$_id"},
//         pipeline: [
//           {$match: {$expr: {$eq: ['$match_id', '$$match_id']}}}
//         ]
//       }
//     },
//     {
//       $project: {
//         match_id: 1,
//         match_name: 1
//       }
//     }
//   ]).exec((err, res) => {
//     if(err) {
//       res.send(err)
//     }
//     if(res) {
//       res.send({
//         error: false,
//         data: res
//       })
//     }
//   })
// })

module.exports = router;

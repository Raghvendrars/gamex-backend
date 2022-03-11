const express = require('express')
const router = express.Router()
const playerteamModel = require('../models/playerteam')
const player = require('../models/playerteam')
const team = require('../models/teamname')

router.post('/addPlayerTeam', async (req, res) => {
    var playerTeam = new playerteamModel()

    playerTeam.playerId = req.body.playerId;
    playerTeam.teamId = req.body.teamId;

    playerTeam.save(function(err){
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).json("playerTeam name added");
        }
    })
})

router.get('/getPlayerTeam', async (req, res) => {
    try {
        const playerTeamDetail = await playerteamModel.find({})
        res.status(200).json(playerTeamDetail)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/updatePlayerTeam/:id', async (req, res) => {
    try {
        const updatePlayerTeam = await playerteamModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        })
        res.status(200).json("Updated")
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/deletePlayerTeam/:id', async (req, res) => {
    const deletePlayerTeam = await playerteamModel.findById(req.params.id);
    try {
        await deletePlayerTeam.delete()
        res.status(200).json("PlayerTeam Deleted");
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
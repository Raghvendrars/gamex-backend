const express = require("express");
const router = express.Router();
const selectFModel = require("../models/selectedFPlayers")

router.get("/getCustomDetail", async (req, res) => {
    try {
        const data1 = await selectFModel.findById(playerNameOneID)

        console.log(data1)

        res.status(200).json(data1)
        
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
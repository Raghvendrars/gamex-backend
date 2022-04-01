const router = require("express").Router();
const user = require("../models/user")
const protectedRoute = require("../middleware/protectedRoute")
const selectedFPlayerModel = require("../models/selectedFPlayers")

router.use(protectedRoute);

//to get user

router.get("/getLoggedInUser", async (req, res) => {
    const uid = res.locals.id;
    try {
      const User = await user.findById(uid);
  
      if (User) {
        if (User.accountStatus === "disable") {
          throw Error("Your Account Is Disable Please Contact Admin");
        }
        res.json(User)
      }
    } catch (err) {
      return res.json({
        isError: true,
        error: err.message || "There Is Some Error",
        data: null,
      });
    }
});

router.post("/getSelectedPlayers", async(req, res) => {
    try {
        const uid = res.locals.id;
        const User = await user.findById(uid);

        const selectPlayerDetail = new selectedFPlayerModel();

        selectPlayerDetail.matchId = req.body.matchId;
        selectPlayerDetail.matchName = req.body.matchName;
        selectPlayerDetail.signInUserId = `${User._id}`;
        selectPlayerDetail.signInUser = `${User.username}`;
        selectPlayerDetail.playerNameOne = req.body.playerNameOne;
        selectPlayerDetail.playerNameTwo = req.body.playerNameTwo;
        selectPlayerDetail.playerNameThree = req.body.playerNameThree;
        selectPlayerDetail.playerNameFour = req.body.playerNameFour;
        selectPlayerDetail.playerNameOneID = req.body.playerNameOneID;
        selectPlayerDetail.playerNameTwoID = req.body.playerNameTwoID;
        selectPlayerDetail.playerNameThreeID = req.body.playerNameThreeID;
        selectPlayerDetail.playerNameFourID = req.body.playerNameFourID;

        const saved = await selectPlayerDetail.save();

        const all = []

        all.push(saved)

        res.status(200).json(selectPlayerDetail)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
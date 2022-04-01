const router = require("express").Router();
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const getToken = require("../utils/getToken");

//Register

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new UserModel({
      username: req.body.username,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(`${user.username} Registered Successfully`);

  } catch (err) {
    res.status(500).json("Error Occured !!");
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong Credentials !");

    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json("Wrong Credentials !");

    const { password, ...others } = user._doc;

    res.cookie("jwt", getToken(others._id), {
      httpOnly: true,
    });
    res.status(200).json("Login Successfully !");
    return;
  } catch (err) {
    return res.json({
      isError: true,
      error: err.message || "There Is Some Error",
      data: null,
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.sendStatus(200);
});

router.get("/getAllLoginUser", async (req, res) => {
  try {
    const getAll = await UserModel.find({})
    res.status(200).json(getAll);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser")
const team = require("./routes/team");
const player = require("./routes/player");
const playerTeam = require("./routes/playerTeam");
const matchTeam = require("./routes/matchTeam");
const actionTeam = require("./routes/actionTeam");
const checkpoint = require("./routes/checkpointTeam");
const matchesAllData = require("./routes/matchesAllData");
const auth = require("./routes/auth");
const user = require("./routes/user");
const cors = require('cors')

const app = express();

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
  })
  .then(console.log("Connected to MongoDB gmex"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:3000',credentials:true
  })
)

app.use(cookieParser());

app.use('/team', team)
app.use('/player', player)
app.use('/playerTeam', playerTeam)
app.use('/matchTeam', matchTeam)
app.use('/actionTeam', actionTeam)
app.use('/checkpoint', checkpoint)
app.use('/matchesAllData', matchesAllData)
app.use('/auth', auth)
app.use('/user', user)

app.get("/", (req, res) => {
  res.send("Gamex Backend");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, console.log(`Server Started On Port ${PORT}`));

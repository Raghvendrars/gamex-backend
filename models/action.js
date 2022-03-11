const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema(
  {
    actionName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("action", actionSchema);

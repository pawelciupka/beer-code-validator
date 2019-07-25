const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CodeSchema = new Schema (
  {
    code: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Code", CodeSchema);


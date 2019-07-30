const mongoose = require("mongoose");
const Code = require("../models/code");

module.exports = {
  create: function(req, res) {
    const id = mongoose.Types.ObjectId();

    console.log("Code: " + req.body.code);

    const code = new Code({
      _id: id,
      code: req.body.code
    });

    code
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while inputing code."
        });
      });
  },

  get: function(req, res) {
    console.log("Code:" + req.query.code);
    let code = req.query.code;
    Code.findOne({ code: code })
      .then(code => {
        res.send(code);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occuered while retriving code."
        });
      });
  }
};

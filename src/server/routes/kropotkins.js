const express = require("express");
const router = express.Router();
const kropotkinDB = require(__dirname + "/../controllers/KropotkinController");

const kropotkinController = new kropotkinDB();

router.get("/", function(req, res, next) {
  res.json("use 'random' route");
});
router.get("/random", function(req, res, next) {
  console.log("Hello Kropotkin Router");
  kropotkinController
    .selectRandomKropotkin()
    .then(function(paragraph) {
      console.log("paragraph", paragraph);
      res.json({
        error: false,
        paragraph
      });
    })
    .catch(function(error) {
      console.error("ERROR", error);
    });
});

module.exports = router;

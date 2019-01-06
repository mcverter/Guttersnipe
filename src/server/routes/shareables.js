const express = require("express");
const router = express.Router();
const shareableDB = require(__dirname + "/../controllers/ShareableController");

const shareableController = new shareableDB();
/* GET shareables listing. */
router.get("/", function(req, res, next) {
  shareableController.selectShareablesList().then(function(collection) {
    res.json({
      error: false,
      data: collection
    });
  });
});
router.get("/categories", function(req, res, next) {
  shareableController.selectCategories().then(function(categories) {
    res.json({
      error: false,
      data: categories
    });
  });
});

/* GET single shareable with comments. */
router.get("/:id", function(req, res, next) {
  console.log("Hello Shareable Router");
  shareableController
    .selectShareableWithComments(req.params.id)
    .then(function(collection) {
      res.json({
        error: false,
        data: collection
      });
    });
});

module.exports = router;

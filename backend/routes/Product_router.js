var express = require("express");
var router = express.Router();
var Task = require("../module/Product");

router.get("/", function (req, res, next) {
  Task.getProduct(function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get("/:id", function (req, res, next) {
  Task.getProductById(req.params.id, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

// router.post("/", function (req, res, next) {
//   Task.addProduct(req.body, function (err, rows) {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(rows);
//     }
//   });
// });

// router.delete("/:id", function (req, res, next) {
//   Task.deleteProduct(req.params.id, function (err, rows) {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(rows);
//     }
//   });
// });

module.exports = router;

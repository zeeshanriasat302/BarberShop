var express = require("express");
var router = express.Router();
const ReviewController = require("../controllers/review.controller");

// Create Review
router.post("/create", ReviewController.create);
// Get All Reviews
router.get("/", ReviewController.getAll);
/* Get Reviews By Id */
router.get("/:id", ReviewController.getById);
/* Get Reviews By User Id */
router.get("/user/:id", ReviewController.getByUserId);
/* Update Review  */
router.patch("/update/:id", ReviewController.update);
/* Delete Reviews  */
router.delete("/delete/:id", ReviewController.delete);

module.exports = router;

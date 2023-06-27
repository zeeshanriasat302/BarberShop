var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");

/* GET welcome message. */
router.get("/", function (req, res, next) {
  res.json({ message: "welcome to supabase!" });
});

//appointment routes
// router.use("/appointments",auth(),require('./appointments'))
router.use("/appointments", require("./appointments"));

//auth routes
router.use("/auth", require("./user.auth"));

module.exports = router;

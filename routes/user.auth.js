var express = require('express');
var router = express.Router();

const AuthController = require("../controllers/user.auth.");
const auth = require("../middleware/auth");

/*  register */
router.post('/register', AuthController.register);
/* login  */
router.post('/login', AuthController.login);
/* get authenticated user */
router.get("/profile", AuthController.getProfile);
// get all users 
router.get("/users", AuthController.getall);


module.exports = router;

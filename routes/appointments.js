var express = require("express");
var router = express.Router();
const AppointmentsController = require("../controllers/appointment.controller")
// const AppointmentsController = require("../controllers/appointments");

/* create appointments  */
router.post("/create", AppointmentsController.create);
/* get appointments  */
router.get("/", AppointmentsController.get);
/* get appointments  by user */
router.get("/user/:id", AppointmentsController.getByUserId);
/* get appointment by id  */
router.get("/:id", AppointmentsController.getById);
/* update appointment by id  */
router.patch("/:id", AppointmentsController.updateById);
/* delete appointment  */
router.delete("/:id", AppointmentsController.deleteById);

module.exports = router;

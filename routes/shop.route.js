var express = require("express");
var router = express.Router();
const ShopController = require("../controllers/shop.controller")

/* create shop  */
router.post("/create", ShopController.create);
/* get shop  */
router.get("/", ShopController.getAll);
/* get shop by id  */
router.get("/:id", ShopController.getById);
/* update shop by id  */
router.patch("/update/:id", ShopController.update);
/* update shop by id  */
router.patch("/status/d/:id", ShopController.updateStatus);
/* delete shop  */
router.delete("/delete/:id", ShopController.delete);

module.exports = router;

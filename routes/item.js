const express = require("express");
const itemController = require("../controllers/item");
const router = express.Router();

router.post("/add", itemController.addItem);
router.delete("/remove", itemController.removeItem);
router.get("/read", itemController.readItem);
router.patch("/update", itemController.updateItem);
router.get("/contains", itemController.containsKey);
router.get("/starts", itemController.startsWith);
router.get("/equals", itemController.equals);

module.exports = router;

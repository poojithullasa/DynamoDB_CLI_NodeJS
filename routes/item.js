const express = require("express");
const itemController = require("../controllers/item");
const router = express.Router();

router.post("/add/:year&:title&:plot&:rating", itemController.addItem);
router.delete("/remove/:year&:title", itemController.removeItem);
router.get("/read/:year&:title", itemController.readItem);
router.patch(
  "/update/:year&:title&:plot&:rating&:actors",
  itemController.updateItem
);
router.get("/contains/:string", itemController.containsKey);
router.get("/starts/:string&:number", itemController.startsWith);
router.get("/equals/:year", itemController.equals);
router.get("/filter/:genre", itemController.filter);

module.exports = router;

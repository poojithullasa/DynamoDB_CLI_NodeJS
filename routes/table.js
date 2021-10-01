const express = require("express");
const tableController = require("../controllers/table");
const router = express.Router();

router.post("/create", tableController.createTable);
router.post("/load", tableController.loadTable);
router.delete("/delete", tableController.deleteTable);
router.get("/getall", tableController.getAll);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/mailConfigController");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.patch("/:id/set-primary", controller.setPrimary);

module.exports = router;

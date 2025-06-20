const express = require("express");
const multer = require("multer");
const { handleJobApplication } = require("../controllers/applyController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/apply", upload.single("file"), handleJobApplication);

module.exports = router;

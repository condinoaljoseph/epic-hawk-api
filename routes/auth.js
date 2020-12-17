const express = require("express");
const router = express.Router();
const { login, recover, reset, resetPassword } = require("../controllers/auth");

router.post("/", login);
router.post("/recover", recover);
router.post("/reset/:token", resetPassword);
router.get("/reset/:token", reset);

module.exports = router;

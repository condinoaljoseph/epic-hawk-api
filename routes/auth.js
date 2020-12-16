const express = require("express");
const router = express.Router();
const { login, recover } = require("../controllers/auth");

router.post("/", login);
router.post("/recover", recover);

module.exports = router;

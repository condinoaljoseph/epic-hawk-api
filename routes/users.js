const express = require("express");
const router = express.Router();
const { login } = require("./handler/users");

router.post("/", login);

module.exports = router;

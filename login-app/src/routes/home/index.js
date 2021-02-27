"use strict";

// 모듈
const express = require("express");

// 라우터
const router = express.Router();

// 컨트롤러
const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.hello);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

module.exports = router;

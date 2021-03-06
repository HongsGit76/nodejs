"use strict";

const User = require("../../models/User");

const output = {
  // index.ejs 로 이동
  hello: (req, res) => {
    res.render("home/index");
  },

  // login.ejs 로 이동
  login: (req, res) => {
    res.render("home/login");
  },

  register: (req, res) => {
    res.render("home/register");
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();

    // 유저 모델 만들기 전 방법
    // return res.json(response);

    // const id = req.body.req_id;
    // const password = req.body.req_password;

    // const users = UserStorage.getUsers("id", "password");
    // const response = {};
    // if (users.id.includes(id)) {
    //   const idx = users.id.indexOf(id);
    //   if (users.password[idx] === password) {
    //     response.success = true;
    //     return res.json(response);
    //   }
    // }
    // response.success = false;
    // response.msg = "로그인에 실패하셨습니다.";
    return res.json(response);
  },

  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};

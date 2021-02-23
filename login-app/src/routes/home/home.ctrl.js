"use strict";

const UserStorage = require("../../models/UserStorage");

const output = {
  // index.ejs 로 이동
  hello: (req, res) => {
    res.render("home/index");
  },

  // login.ejs 로 이동
  login: (req, res) => {
    res.render("home/login");
  },
};

const process = {
  login: (req, res) => {
    const id = req.body.req_id;
    const password = req.body.req_password;

    const userStorage = userStorage();
    // const response = {};
    // if (users.id.includes(id)) {
    //   const idx = users.id.indexOf(id);
    //   if (users.password[idx] === password) {
    //     response.success = true;
    //     return res.json(response);
    //   }

    //   response.success = false;
    //   response.msg = "비밀번호 오류";
    //   return res.json(response);
    // }
    // response.success = false;
    // return res.json(response);
  },
};

module.exports = {
  output,
  process,
};

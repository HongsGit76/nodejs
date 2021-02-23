"use strict";

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

// 회원가입 구현을 위한 user 목록
const users = {
  id: ["qwer", "asdf", "zxcv"],
  password: ["1234", "5678", "9101"],
};

const process = {
  login: (req, res) => {
    const id = req.body.req_id;
    const password = req.body.req_password;

    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id);
      if (users.password[idx] === password) {
        return res.json({
          success: true,
        });
      }

      return res.json({
        success: false,
        msg: "비밀번호 오류",
      });
    }
    return res.json({
      success: false,
    });
  },
};

module.exports = {
  output,
  process,
};

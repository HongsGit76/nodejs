"use strict";

const UserStorage = require("./UserStorage");
class User {
  constructor(body) {
    this.body = body;
  }

  login() {
    const body = this.body;
    const { id, password } = UserStorage.getUserInfo(body.req_id);
    if (id) {
      if (id === body.req_id && password === body.req_password) {
        return { success: true };
      }

      return { success: false, msg: "비밀번호 틀림" };
    }
    return { success: false, msg: "존재하지 않는 아이디" };
  }

  register() {
    const client = this.body;
    UserStorage.save(client);
  }
}

module.exports = User;

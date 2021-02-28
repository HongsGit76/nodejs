"use strict";

const UserStorage = require("./UserStorage");
class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    const { id, password } = await UserStorage.getUserInfo(client.req_id);
    if (id) {
      if (id === client.req_id && password === client.req_password) {
        return { success: true };
      }

      return { success: false, msg: "비밀번호 틀림" };
    }
    return { success: false, msg: "존재하지 않는 아이디" };
  }

  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      console.log(response);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = User;

"use strict";

const fs = require("fs").promises;

class UserStorage {
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const userKeys = Object.keys(users); // => [id, password, name]과 같은 배열 생성해줌
    const userInfo = userKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {}); // 뒤에 붙는 {} 초기값인 오브젝트
    console.log(userInfo);
    return userInfo;
  }

  static getUsers(...fields) {
    //const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static getUserInfo(check_id) {
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(data, check_id);
      })
      .catch(console.log);
  }

  static save(userInfo) {
    //const users = this.#users;
    users.id.push(userInfo.req_id);
    users.password.push(userInfo.req_password);
    users.name.push(userInfo.req_name);
    return { success: true };
  }
}

module.exports = UserStorage;

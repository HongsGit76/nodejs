"use strict";

class UserStorage {
  // 회원가입 구현을 위한 user 목록
  // static으로 선언할 시 외부에서 이 클래스 내부의 users에 접근 가능
  // #을 앞에 붙임으로 써 막아줌 은닉화
  static #users = {
    id: ["qwer", "asdf", "zxcv"],
    password: ["1234", "5678", "9101"],
    name: ["qqqq", "aaaa", "zzzz"],
  };

  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }
}

module.exports = UserStorage;

"use strict";

console.log("log in success");

const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
  const req = {
    id: id.nodeValue,
    password: password.nodeValue,
  };
}

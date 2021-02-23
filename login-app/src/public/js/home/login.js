"use strict";

// console.log("log in success");

const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
  const req = {
    req_id: id.value,
    req_password: password.value,
  };

  // 서버로 데이터 요청
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    //then : 서버에서 응답한 메세지 받기
    .then((res) => {
      if (res.success) {
        // 지정된 위치로 이동하기
        location.href = "/";
      } else {
        alert("res.msg");
      }
    })
    // promise 객체 반환시 then 으로 접근
    .catch((err) => {
      console.error(new Error("로그인 중 에러 발생"));
    });
}

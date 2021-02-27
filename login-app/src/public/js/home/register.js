"use strict";

// console.log("log in success");

const id = document.querySelector("#id");
const name = document.querySelector("#name");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
  const req = {
    req_id: id.value,
    req_name: name.value,
    req_password: password.value,
    req_confirmPassword: confirmPassword.value,
  };

  console.log(req);

  // 서버로 데이터 요청
  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json()) // 프로미스 객체로 반환
    //then : 서버에서 응답한 메세지 받기
    .then((res) => {
      if (res.success) {
        // 지정된 위치로 이동하기
        location.href = "/login";
      } else {
        alert("res.msg");
      }
    })
    // promise 객체 반환시 then 으로 접근
    .catch((err) => {
      console.error(new Error("로그인 중 에러 발생"));
    });
}

"use strict";

const id = document.querySelector("#userID"),
name = document.querySelector("#userNAME"),
password = document.querySelector("#userPS"),
registerButton = document.querySelector("#registerButton")

registerButton.addEventListener("click", register);

function register() {
  if (!id.value) return alert("학번(아이디)를 입력해주십시오.");
  if (!name.value) return alert("이름을 입력해주십시오.");
  if (!password.value) return alert("비밀번호를 입력해주십시오.");

  const req = { 
    id: id.value,
    name: name.value,
    password: password.value,
  };
  console.log(req);

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.success) {
        location.href = "/login";
    } else {
      alert(res.msg);
    }
  })
  .catch((err) => {
    console.error("회원가입 중 에러 발생");
    });
}
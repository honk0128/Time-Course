"use strict";

const id = document.querySelector("#userID"),
password = document.querySelector("#userPS"),
loginButton = document.querySelector("#loginButton")

loginButton.addEventListener("click", login);

function login() {
  const req = {
    id: id.value,
    password: password.value,
  };
  console.log(req);

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.success) {
        location.href = "/";
    } else {
      alert(res.msg);
    }
  })
  .catch((err) => {
    console.error("로그인 중 에러 발생");
    });
}
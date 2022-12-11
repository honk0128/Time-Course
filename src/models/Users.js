"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    // const { id, password } = UserStorage.getUserInfo(client.id);
    const users = await UserStorage.getUserInfo(client.id);
    if (users) {
      if (users.id === client.id && users.password === client.password) {
        return { success: true };
      }
      return { success: false, msg: "비밀번호가 틀렸습니다." };
    }
    return { seccess: false, msg: "존재하지 않는 아이디 입니다. " };
  }

  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = User;

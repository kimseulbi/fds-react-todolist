import React, { Component } from "react";

import api from "./api";

// 폼 submit 이벤트가 일어났을 때
// username, password를 얻어온 후
// 서버에 전송하고 토큰을 받아와서 localStorage에 저장
// 한 뒤에 할일 목록을 보여주기

export default class LoginForm extends Component {
  async handleSubmit(e) {
    e.preventDefault();
    // e: 이벤트 객체
    // e.target: 이벤트를 실제로 일으킨 요소 객체 (여기서는 loginFormEl)
    // e.target.elements: 폼 내부에 들어있는 요소 객체를 편하게 가져올 수 있는 특이한 객체
    // e.target.elements.username: name 어트리뷰트에 username이라고 지정되어있는 input 요소 객체
    // .value: 사용자가 input 태그에 입력한 값
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const res = await api.post("/users/login", {
      username,
      password
    });
    localStorage.setItem("token", res.data.token);
    this.props.onLogin();
  }
  render() {
    return (
      <section className="login">
        <form onSubmit={e => this.handleSubmit(e)} className="login-form">
          <h2 className="tit">Login</h2>
          <input type="text" name="username" />
          <input type="password" name="password" />
          <button>전송</button>
        </form>
      </section>
    );
  }
}

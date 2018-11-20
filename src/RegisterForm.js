import React, { Component } from "react";
import api from "./api";
export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 현재 입력 필드에 입력된 사용자 이름/암호
      username: "",
      password: ""
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    // 사용자 이름 중복체크
    const { data: users } = await api.get("/users", {
      params: {
        username
      }
    });
    if (users.length > 0) {
      alert("이미 같은 이름이 사용 중입니다.");
      return;
    }
    const res = await api.post("/users/register", {
      username,
      password
    });
    localStorage.setItem("token", res.data.token);
    this.props.onRegister();
  }

  handleFieldChange(e, name) {
    // name 변수에 저장되어 있는 문자열을
    // 그대로 속성 이름으로 사용하기
    this.setState({ [name]: e.target.value });
  }

  // value에 저장된 값을 onChange로 가져와 handleFieldChange 처리 ->
  render() {
    const { username, password } = this.state;
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <h1>회원가입</h1>
        <input
          type="text"
          name="username"
          value={username}
          onChange={e => this.handleFieldChange(e, "username")}
        />
        <input
          type="text"
          name="password"
          value={password}
          onChange={e => this.handleFieldChange(e, "password")}
        />
      </form>
    );
  }
}

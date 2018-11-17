import React from "react";
import ReactDOM from "react-dom";
import LoginForm from "./LoginForm";
import TodoList from "./TodoList";

import "./styles.css";

class App extends React.Component {
  // 상태 설계
  constructor(poprs) {
    super(poprs);
    this.state = {page: localStorage.getItem("token") ? "todo-list" : "login"};
  }

  handleLogin() {
    this.setState({
      page: "todo-list"
    })
  }

  handleLogout() {
    this.setState({
      page:"login"
    })
  }

  render() {
    return (
      <div className="App">
      {this.state.page === "login" ? (
        <LoginForm onLogin={()=>this.handleLogin()} />
        ) : this.state.page === "todo-list" ? (
          <TodoList onLogout={()=>this.handleLogout()} />
        ): null}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

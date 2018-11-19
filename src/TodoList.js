import React from "react";
import api from "./api";
import classNames from "classnames";
import moment from "moment";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: false
    };
  }

  // componentDidMount: 컴포넌트 출력이 DOM에 렌더링된 이후 동작, 컴포넌트 생성후, 최초로 렌더링
  // 할일 목록 처음불러올때
  async componentDidMount() {
    this.setState({
      loading: true
    });
    // 서버에서 할 일 목록 받아오기
    const res = await api.get("/todos");
    const todos = res.data;
    // 받아온 후 상태
    this.setState({
      todos: todos,
      loading: false
    });
  }
  // 추가 버튼
  async handleSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    // 서버에 새 할 일 전송
    const body = e.target.elements.body.value;
    await api.post("/todos", {
      body,
      complete: false
    });
    // 서버에서 할 일 목록 다시 받아오기
    const res = await api.get("/todos");
    // 할 일 목록을 화면에 그려주기
    const todos = res.data;
        if(todos.length > 7) {
          alert('7개이상 목록을 저장할수 없습니다.')
          return
        }
    this.setState({
      todos: todos,
      loading: false
    });
  }
  // 삭제버튼
  async handleDelete(e, id) {
    this.setState({
      loading: true
    });
    // 사바에 할 일 삭제
    await api.delete("/todos/" + id);
    // 서버에서 할 일 목록 다시 받아오기
    const res = await api.get("/todos");
    // 할 일 목록을 화면에 그려주기
    const todos = res.data;
    this.setState({
      todos: todos,
      loading: false
    });
  }
  // 로그아웃 버튼
  async handleLogout(e) {
    e.preventDefault();
    this.setState({
      loading:true
    })
    localStorage.removeItem("token");
    this.props.onLogout();
  }

  render() {
    const divClass = classNames({
      loading: this.state.loading,
      TodoList
    });

    return <div className={divClass}>
        <h1>{moment(new Date()).format("YYYY-MM-DD")}</h1>
        <button className="logout" onClick={e => this.handleLogout(e)}>나가기</button>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="text" name="body" />
          <button>추가</button>
        </form>
        <ul>
          {this.state.todos.map(todo => <li key={todo.id}>
              {todo.body}
              <button onClick={e => this.handleDelete(e, todo.id)}>
                삭제
              </button>
            </li>)}
        </ul>
      </div>;
  }
}

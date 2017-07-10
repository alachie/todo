import React from 'react';

import TodoList from './compontents/todoList';
import TodoInput from './compontents/TodoInput';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: this.getTodos()
		}
		
	}
	getTodos() {
		if(!localStorage.getItem("todos")) {
			return [];
		} else {
			return JSON.parse(localStorage.getItem("todos"))
		}
	}
	render() {
		return (
			<div className="app">
				<h1>Todo 📝</h1>
				<TodoList todos={this.state.todos} gState={this.state} gSetState={this.setState.bind(this)}/>
				<TodoInput gState={this.state} gSetState={this.setState.bind(this)}/>
			</div>
		)
	}
}
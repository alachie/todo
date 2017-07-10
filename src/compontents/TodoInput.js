import React from 'react';
import styles from './TodoInput.sass';

export default class TodoInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}
	
	handleChange(e) {
		this.setState({value: e.target.value});
	}

	handleKeyDown(e) {
		switch(e.keyCode) {
			case 13: 
				console.log('submit')
				this.handleAdd()
				break;
		}
	}
	
	handleAdd(e) {
		if(e){
			e.preventDefault();
		}

		if(this.state.value.trim() === "") {
			alert('cannot be blank 😢');
			return;
		}

		const { todos } = this.props.gState;
		todos.push({
			id: Date.now(),
			title: this.state.value,
			completed: false
		})
		this.props.gSetState({
			todos: todos
		})
		localStorage.setItem("todos", JSON.stringify(this.props.gState.todos));
		this.setState({
			value: ''
		}) 
	}
	
	render() {
		return (
			<div className="TodoInput">
				<input type="text" value={this.state.value}onChange={this.handleChange.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}/>
				<a href="#" className="add" onClick={this.handleAdd.bind(this)}>+</a>
			</div>
		)
	}
}
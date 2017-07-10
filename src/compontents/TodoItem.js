import React from 'react';
import styles from './TodoItem.sass'
import classNames from 'classnames';

export default class TodoItem extends React.Component {
	handleChange(e) {
		const { todos } = this.props.gState;
		const { data } = this.props;

		const index = todos.findIndex(todo => todo.id === data.id);
		todos[index].completed = !data.completed;
		
		this.props.gSetState({todos});
		localStorage.setItem("todos", JSON.stringify(this.props.gState.todos));
	}

	handleDelete(e) {
		e.preventDefault();
		const { todos } = this.props.gState;
		const { id } = this.props.data;

		const index = todos.findIndex(todo => todo.id === id);
		todos.splice(index, 1);
		
		this.props.gSetState({todos});
		
		localStorage.setItem("todos", JSON.stringify(this.props.gState.todos));
	}


	render() {
		const { data } = this.props;
		const classes = classNames({
			"TodoItem": true,
			"completed": data.completed
		})
		return (
			<li className={classes}>
				<input type="checkbox" checked={data.completed} onChange={this.handleChange.bind(this)}/>
				<div className="title"><span>{data.title}</span></div>
				<a className="delete" href="#" onClick={this.handleDelete.bind(this)}>✕</a>
			</li>
		)
	}
}
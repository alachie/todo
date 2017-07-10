import React from 'react';
import TodoItem from './TodoItem';
import styles from './TodoList.sass';

export default class TodoList extends React.Component {

	render() {
		if(this.props.todos.length === 0) {
			return(
				<ul className="TodoList">
					<span>no todos</span>
				</ul>
			)
		}

		return (
			<ul className="TodoList">
				{this.props.todos.map(o => (<TodoItem data={o} gState={this.props.gState} gSetState={this.props.gSetState} key={o.id} />))}
			</ul>
		)
	}
}
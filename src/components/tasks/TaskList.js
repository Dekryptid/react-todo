import React, { Component } from 'react';
import TaskListItem from './TaskListItem';

class TaskList extends Component {
    createTasks = task => {
        return (
            <TaskListItem key={task._id} task={task} delete={this.props.delete} edit={this.props.edit} />
        )
    }

    render() {
        const { tasks } = this.props;
        const listItems = tasks.map(this.createTasks);
        let listGroup = (<div className="text-center text-muted">Nothing to do!</div>)
        if (tasks.length) {
            listGroup = (<ul className="list-group">{listItems}</ul>);
        }
        return (<div>{listGroup}</div>)
    }
}

export default TaskList;
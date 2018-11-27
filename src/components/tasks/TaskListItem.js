import React, { Component } from 'react';

class TaskListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            title: this.props.task.title,
            doneyet: !!this.props.task.doneyet,
            saveDisabled: false
        };
    }

    canSave = () => {
        const { title } = this.state;
        if (title.length > 0) {
          this.setState({
            saveDisabled: false
          });
        } else {
          this.setState({
            saveDisabled: true
          });
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        }, () => {this.canSave()});
    }

    renderActions() {
        if (this.state.isEditing) {
            return (
                <div className="float-right">
                    <i className="far fa-save text-success mr-2" title="Save" onClick={this.editTask.bind(this)}></i>
                    <i className="fas fa-times text-danger mr-2" title="Cancel" onClick={this.setEditState.bind(this, false)}></i>
                </div>
            );
        }

        return (
            <div className="float-right">
                <i className="far fa-edit text-warning mr-2" title="Edit" onClick={this.setEditState.bind(this, true)}></i>
                <i className="fas fa-trash text-danger mr-2" title="Delete" onClick={this.deleteTask.bind(this)}></i>
            </div>
        );
    }

    renderTask() {
        const { title, isEditing, doneyet } = this.state;
        if (isEditing) {
            return (
                <form onSubmit={this.editTask.bind(this)}>
                    <input id="title" type="text" ref="task" value={title} onChange={this.handleChange} autoFocus />
                </form>
            );
        } else {
            let taskTitle = (<span className="ml-1">{title}</span>);
            if (doneyet) {
                taskTitle = (<s className="ml-1">{title}</s>)
            }
            return (
                <div>
                    <input id="doneyet" type="checkbox" checked={doneyet} onChange={this.toggleDone} />
                    {taskTitle}
                </div>
            );
        }
    }

    render () {
        return (
            <li className="list-group-item" key={this.props.task._id} >
                {this.renderActions()}
                {this.renderTask()}
            </li>
        )
    }

    toggleDone = event => {
        const { task } = this.props;
        this.props.edit({ 
            ...task, 
            doneyet: event.target.checked
        });
        this.setState({ doneyet: event.target.checked });
    }

    editTask = event => {
        const { task } = this.props;
        this.props.edit({ 
            ...task, 
            title: this.state.title
        });
        this.setEditState(false);
        if (event) {
            event.preventDefault();
        }
    }

    deleteTask = () => {
        const { task } = this.props;
        this.props.delete(task);
    }

    setEditState = isEditing => this.setState({ isEditing });
}

export default TaskListItem;
import React, { Component } from 'react';

class NewTask extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            isSubmitDisabled: true
        };
    }

    toggleSubmitDisabled = () => {
        const { title, description } = this.state;
        if (title.length > 0 && description.length > 0) {
          this.setState({ isSubmitDisabled: false });
        } else {
            this.setState({ isSubmitDisabled: true });
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        }, () => {this.toggleSubmitDisabled()});
    }

    handleSubmit = event => {
        event.preventDefault();
        const { title, description } = this.state;

        if (!(title.length > 0) && !(description.length > 0)) {
            return;
        }

        this.setState({
            title: '',
            description: ''
        });

        this.props.onSubmit({
            title, description
        });
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group p-0 px-2 row mb-0">
                    <div className="col-9">
                        <input 
                            id="title" 
                            className="form-control" 
                            type="text" 
                            placeholder="What needs to be done?"
                            onChange={this.handleChange}
                            value={this.state.title}
                            autoComplete="off"
                            autoFocus
                        />
                    </div>
                    <div className="col-3">
                        <button type="submit" className="btn btn-block btn-primary mb-2" disabled={this.state.isSubmitDisabled}>Add Task</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default NewTask;
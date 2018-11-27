import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import TaskList from './TaskList';
import NewTask from './NewTask';
import './Tasks.css';

class TasksMain extends Component {
  constructor (props) {
      super(props);
      this.state = {
        tasks: [],
        redirectTo: null
      };
  }

  componentDidMount = () => {
    if (this.props.user.username === null) {
      this.setState({ redirectTo: '/login' });
    } else {
      this.loadTasks();
    }
  }

  loadTasks = () => {
    // load the tasks from the server
    axios
      .get('http://localhost:5000/api/tasks', null, {
        withCredentials: true
      })
      .then(res => {
        const { data } = res;
        this.setState({ tasks: [...data] });
      });
  }

  createTask = (task) => {
    var newTask = {
      title: task.title,
      description: task.description
    };
    axios
      .post('http://localhost:5000/api/tasks/create', newTask, {
        withCredentials: true
      })
      .then(res => {
        if (res.status === 200) {
          this.loadTasks();
        }
      });
  }

  editTask = (task) => {
      axios
        .post('http://localhost:5000/api/tasks/edit/' + task._id, task, {
          withCredentials: true
        })
        .then(res => {
          if (res.status === 200) {
            //this.loadTasks();
          }
        });
  }

  deleteTask = (task) => {
    axios
      .post('http://localhost:5000/api/tasks/delete/' + task._id, null, {
        withCredentials: true
      })
      .then(res => {
        if (res.status === 200) {
          this.loadTasks();
        }
      });
  }

  logout = () => {
    axios
      .post('http://localhost:5000/api/logout', null, {
        withCredentials: true
      })
      .then(res => {
        const { status } = res;
        if (status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null
          });
          this.props.history.push('/login');
        }
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      const AuthButton = () => {
        if (this.props.user.loggedIn) {
          return (
            <button className="btn btn-danger btn-block" onClick={() => this.logout()}>Sign out</button>
          );
        } else {
          return <Link className="btn btn-success btn-block" to="/login">Login</Link>
        }
      }

      return (
          <div className="row justify-content-md-center task-container">
            <div className="col-6">
              <h3>Welcome { this.props.user.username }!</h3>
              <div className="card">
                <div className="card-header p-0 mt-2">
                  <NewTask onSubmit={this.createTask} />
                </div>
                <div className="card-body">
                  <TaskList 
                    tasks={this.state.tasks} 
                    delete={this.deleteTask}
                    edit={this.editTask} 
                  />
                </div>
                <div className="card-footer">
                  <AuthButton />
                </div>
              </div>
            </div>
        </div>
      );
    }
  }
}
export default TasksMain;
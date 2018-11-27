import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import TasksMain from './components/tasks/TasksMain';

class App extends Component {
   constructor() {
     super();

     this.state = {
       loggedIn: false,
       username: null
     };
   }

   updateUser = user => {
     this.setState(user);
   }

   render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={(props) => <TasksMain updateUser={this.updateUser} user={this.state} {...props} />}/>
          <Route path='/login' render={(props) => <Login updateUser={this.updateUser} loggedIn={this.state.loggedIn} {...props} />}/>
          <Route path='/register' render={(props) => <Register updateUser={this.updateUser} loggedIn={this.state.loggedIn} {...props} />}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
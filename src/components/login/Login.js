import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLoginDisabled: true,
            hasError: false,
            errorMessage: '',
            redirectTo: null
        };
    }

    componentDidMount = () => {
        if(this.props.loggedIn) {
            this.setState({ redirectTo: '/' });
        }
    }

    canLogin = () => {
        const { username, password } = this.state;
        if (username.length > 0 && password.length > 0) {
          this.setState({
            isLoginDisabled: false
          });
        } else {
          this.setState({
            isLoginDisabled: true
          });
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        }, () => {this.canLogin()});
    }

    handleSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;
        axios
            .post('http://localhost:5000/api/login', { 
                username, 
                password 
            }, {
                withCredentials: true
            })
            .then(res => {
                const { data } = res;
                if (data) {
                    if (data.message) {
                        event.target.reset();
                        this.usernameInput && this.usernameInput.focus();
                        this.setState({ 
                            hasError: this.props.auth.hasError, 
                            errorMessage: this.props.auth.errorMessage,
                            isLoginDisabled: true
                        });
                    } else {
                        this.props.updateUser({
                            loggedIn: true,
                            username: data.username
                        });
                        this.setState({ redirectTo: '/' });
                    }
                }
            })
            .catch(err => {
                const { response } = err;
                console.log('Error', response);
            });
    }

    renderError = () => {
        const { hasError, errorMessage } = this.state;
        if (hasError) {
            return (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {errorMessage}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            );
        }
        return <div></div>
    }

    render = () => {
        let options = {
            username: {
              label: "Username",
              placeholder: "Username"
            },
            password: {
              label: "Password",
              placeholder: "Password"
            },
            submitButton: {
              text: "Login"
            },
            registerButton: {
                text: "Register"
            }
        };
        options = Object.assign(options, this.props.options || {});

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="row justify-content-md-center task-container">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-header">
                                Login
                            </div>
                            <div className="card-body">
                                {this.renderError()}
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            id="username" 
                                            onChange={this.handleChange} 
                                            className="form-control" 
                                            placeholder={options.username.placeholder} 
                                            ref={el => {this.usernameInput = el; }} 
                                            autoFocus />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" id="password" onChange={this.handleChange} className="form-control" placeholder={options.password.placeholder} />
                                    </div>
                                    <button type="submit" className="btn btn-success btn-block" disabled={this.state.isLoginDisabled}>{options.submitButton.text}</button>
                                    <Link className="btn btn-primary btn-block" to="/register">{options.registerButton.text}</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default withRouter(Login);
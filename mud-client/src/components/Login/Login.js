import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const URL = `https://lambda-mud-cs.herokuapp.com/api/login/`;
    axios
      .post(URL, {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem("authToken", res.data.key);
        console.log(res.data.key);
        // clear form after submit
        this.setState({
          username: "",
          password: ""
        });
        // navigate to page after logging in
        this.props.history.push("/game");
      })
      .catch(err => {
        alert("Invalid Credentials");
        this.setState({
          username: "",
          password: ""
        });
        console.log(err);
      });
  };

  render() {
    return (
      <div className='app'>
        <div className='spacer'>Game Land</div>
        <form className='form' onSubmit={this.handleSubmit}>
          <p className='clearfix'>
            <label for='login'>Username</label>
            <input
              name='username'
              type='text'
              placeholder='Select a username'
              onChange={this.handleChange}
              value={this.state.username}
            />
          </p>
          <p className='clearfix'>
            <label for='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Select a password'
              onChange={this.handleChange}
              value={this.state.password}
            />
          </p>
          <p className='register'>
            Don't have an account?
            <Link to='/register'>Register</Link>
          </p>
          <p className='clearfix'>
            <input
              type='submit'
              name='submit'
              value='Sign in'
              className='submit'
            />
          </p>
        </form>
      </div>
    );
  }
}

export default Login;

import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password1: "",
      password2: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (
      this.state.username === "" ||
      this.state.password1 === "" ||
      this.state.password2 === ""
    ) {
      console.log("All Fields Required");
      return;
    }

    if (this.state.password1 !== this.state.password2) {
      console.log("Passwords Don't Match");
    }

    const URL = `https://lambda-mud-cs.herokuapp.com/api/registration/`;
    axios
      .post(URL, {
        username: this.state.username,
        password1: this.state.password1,
        password2: this.state.password2
      })
      .then(res => {
        localStorage.setItem("authToken", res.data.key);
        console.log(res.data.key);
        // clear form after submit
        this.setState({
          username: "",
          password1: "",
          password2: ""
        });
        // navigate to page after registering
        this.props.history.push("/game");
      })
      .catch(err => {
        alert(
          "Passwords must match, contain letters and numbers, cannot be the same as your username, and must be at be least 8 characters!"
        );
        this.setState({
          username: "",
          password1: "",
          password2: ""
        });
        console.log(err);
      });
  };

  render() {
    return (
      <div className='app'>
        <div className='spacer'>Game Land</div>
        <form className='form2' onSubmit={this.handleSubmit}>
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
              name='password1'
              type='password'
              placeholder='Select a password'
              onChange={this.handleChange}
              value={this.state.password1}
            />
          </p>
          <p className='clearfix'>
            <label for='password'>Verify Password</label>
            <input
              name='password2'
              type='password'
              placeholder='Confirm your password'
              onChange={this.handleChange}
              value={this.state.password2}
            />
          </p>
          <p className='register'>
            Have an account?
            <Link to='/login'>Sign In</Link>
          </p>
          <p className='clearfix'>
            <input
              type='submit'
              name='submit'
              value='Register'
              className='submit'
            />
          </p>
        </form>
      </div>
      /////////////////////////////////
    );
  }
}

export default Register;

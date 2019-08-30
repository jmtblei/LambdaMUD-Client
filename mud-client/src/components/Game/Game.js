import React from "react";
import Nav from "../Nav/Nav";
import "./Game.css";
import axios from "axios";

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      title: "",
      description: "",
      uuid: "",
      players: [],
      error_msg: ""
    };
  }

  componentDidMount() {
    this.gameInitialize();
  }

  gameInitialize = () => {
    const URL = `https://lambda-mud-cs.herokuapp.com/api/adv/init`;
    const token = "Token " + localStorage.getItem("authToken");
    const headers = {
      headers: { "content-type": "application/JSON", Authorization: token }
    };
    axios
      .get(URL, headers)
      .then(res => {
        this.setState({
          uuid: res.data.uuid,
          name: res.data.name,
          title: res.data.title,
          description: res.data.description,
          players: res.data.players
        });
        console.log("initdata", res.data);
      })
      .catch(err => console.log(err));
  };

  playerMoveN = () => {
    const URL = `https://lambda-mud-cs.herokuapp.com/api/adv/move`;
    const token = "Token " + localStorage.getItem("authToken");
    const headers = {
      headers: { "content-type": "application/JSON", Authorization: token }
    };
    const body = {"direction":"n"}
    axios
        .post(URL, body, headers)
        .then(res => {
            this.setState({
              name: res.data.name,
              title: res.data.title,
              description: res.data.description,
              players: res.data.players,
              error_msg: res.data.error_msg
            });
            console.log("movedata", res.data);
          })
          .catch(err => console.log(err));
  }

  playerMoveW = () => {
    const URL = `https://lambda-mud-cs.herokuapp.com/api/adv/move`;
    const token = "Token " + localStorage.getItem("authToken");
    const headers = {
      headers: { "content-type": "application/JSON", Authorization: token }
    };
    const body = {"direction":"w"}
    axios
        .post(URL, body, headers)
        .then(res => {
            this.setState({
              name: res.data.name,
              title: res.data.title,
              description: res.data.description,
              players: res.data.players,
              error_msg: res.data.error_msg
            });
            console.log("movedata", res.data);
          })
          .catch(err => console.log(err));
  }

  playerMoveE = () => {
    const URL = `https://lambda-mud-cs.herokuapp.com/api/adv/move`;
    const token = "Token " + localStorage.getItem("authToken");
    const headers = {
      headers: { "content-type": "application/JSON", Authorization: token }
    };
    const body = {"direction":"e"}
    axios
        .post(URL, body, headers)
        .then(res => {
            this.setState({
              name: res.data.name,
              title: res.data.title,
              description: res.data.description,
              players: res.data.players,
              error_msg: res.data.error_msg
            });
            console.log("movedata", res.data);
          })
          .catch(err => console.log(err));
  }
  
  playerMoveS = () => {
    const URL = `https://lambda-mud-cs.herokuapp.com/api/adv/move`;
    const token = "Token " + localStorage.getItem("authToken");
    const headers = {
      headers: { "content-type": "application/JSON", Authorization: token }
    };
    const body = {"direction":"s"}
    axios
        .post(URL, body, headers)
        .then(res => {
            this.setState({
              name: res.data.name,
              title: res.data.title,
              description: res.data.description,
              players: res.data.players,
              error_msg: res.data.error_msg
            });
            console.log("movedata", res.data);
          })
          .catch(err => console.log(err));
  }

  render() {
    let player;
    if (this.state.players.length === 0) {
      player = <div className='players'>Other Players in room: None</div>;
    } else {
      player = <div className='players'>Other Players in room: {this.state.players}</div>;
    }
    return (
      <div className='app'>
        <Nav />
        <div className='gameContainer'>
          <div className='dashboard'>
            <div className='name'>Hello, {this.state.name}</div>
            <div className='room'>You are in room: {this.state.title}</div>
            <div className='desc'>{this.state.description}</div>
            <div className='desc'>{this.state.error_msg}</div>
            <div className='lowerDash'>
              {player}
              <div className='buttons'>
                <button onClick={this.playerMoveN}>North</button>
                <div>
                  <button onClick={this.playerMoveW}>West</button>
                  <button onClick={this.playerMoveE}>East</button>
                </div>
                <button onClick={this.playerMoveS}>South</button>
              </div>
            </div>
          </div>

          <div>
            <div className='container'>
              <div className='leftHouse'>
                <div className='outside2'>Overlook</div>
                <div className='outside2'>Foyer</div>
                <div className='outside'>Outside</div>
              </div>
              <div className='hall'></div>
              <div className='rightHouse'>
                <div className='outside2'>Treasure</div>
                <div className='outside'>Narrow</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;

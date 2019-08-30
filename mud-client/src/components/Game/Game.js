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
      players: []
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

  render() {
    let player;
    if (this.state.players.length === 0) {
      player = <div className='players'>Players: None</div>;
    } else {
      player = <div className='players'>Players: {this.state.players}</div>;
    }
    return (
      <>
        <Nav />
        <div className='game'>GAME LAND</div>
        <div className='gameContainer'>
          <div className='dashboard'>
            <div className='name'>{this.state.name}</div>
            <div className='room'>Room: {this.state.title}</div>
            <div className='desc'>{this.state.description}</div>
            <div className='lowerDash'>
              {player}
              <div className='buttons'>
                <button>North</button>
                <div>
                  <button>West</button>
                  <button>East</button>
                </div>
                <button>South</button>
              </div>
            </div>
          </div>

          <div>
            <div className='container'>
              <div className='leftHouse'>
                <div class='outside2'>Overlook</div>
                <div class='outside2'>Foyer</div>
                <div class='outside'>Outside</div>
              </div>
              <div className='hall'></div>
              <div class='rightHouse'>
                <div class='outside2'>Treasure</div>
                <div class='outside'>Narrow</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Game;

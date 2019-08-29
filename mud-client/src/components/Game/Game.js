import React from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';

class Game extends React.component {
    constructor() {
        super(); 
        this.state = {
            player: {
                name: '',
                title: '',
                description: '',
                uuid: '',
                players: []
            }
        };
    }

    componentDidMount() {
        this.gameInitialize();
    }
    

    gameInitialize = () => {
        const URL = 
        `https://lambda-mud-cs.herokuapp.com/api/adv/init`;
        const token = 
        "Token " + localStorage.getItem("authToken"); 
        const headers = {headers: {"content-type": "application/JSON", Authorization: token}};
        axios
            .get(URL, headers)
            .then(res => {
                this.setState({
                    uuid: res.data.uuid,
                    name: res.data.name,
                    title: res.data.title,
                    description: res.data.description,
                    players: res.data.players
                })
                console.log('initdata', res.data)
            })
            .catch(err => console.log(err))
    }

    handleMove = (direction) => {
        const header = {
            Authorization: `Token ${this.state.key}`
        };
        axios
            .post("https://lambda-mud-cs.herokuapp.com/api/adv/move/", {direction: direction},
            {headers: header})
            .then(res => {
                console.lof("Move", res.data.title)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <Nav />
                <div className="game">
                    <h1>GAME LAND</h1>
                    <p>Player: {this.state.player.name}</p>
                    <p>Current Location: {this.state.player.title}</p>
                    <p>Description: {this.state.player.description}</p>
                    <input type="text" placeholder="Enter Command Here" />
                    <div>
                        <h3>Players in Room</h3>
                        <div>{this.state.player.players.length !== 0 ? 
                            <h3>{this.state.player.players.map(player => {
                                return (
                                <p>{player}</p>)
                            })}
                            </h3> : ( 
                                <h3>No players in the Room</h3>
                            )}
                        </div>
                        <button onClick={() => this.handleMove}>West</button>
                        <div><button onClick={() => this.handleMove}>North</button><button onClick={() => this.handleMove}>South</button></div>
                        <button onClick={() => this.handleMove}>East</button>
                    </div>
                </div>
           </>
       )
    }
}

export default Game;

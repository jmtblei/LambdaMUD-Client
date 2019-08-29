import React from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';

class Game extends React.Component {
    constructor() {
        super(); 
        this.state = {
                name: '',
                title: '',
                description: '',
                uuid: '',
                players: [],
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

    render() {
        return (
            <>
            <Nav />
            <div className="game">GAME LAND</div>
                <div>Hello {this.state.name}</div>
                <div>You are currently at {this.state.title}</div>
                <div>{this.state.description}</div>
                <input type="text" placeholder="Enter Command Here" />
            <div>
                <h1>Game On</h1>
                <button>North</button>
               <div><button>West</button><button>East</button></div>
               <button>South</button>
            </div>
           </>
       )
    }
}

export default Game;

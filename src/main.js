import Phaser from 'phaser'
import firebase from "firebase/app";
import ArenaScene from './scenes/ArenaScene'
import Config from "./util/Config";
require("firebase/database");


firebase.initializeApp({
    apiKey: "AIzaSyAOv5F820GrniYpFKypnAmHrTMA_DqWhVc",
    authDomain: "archeun-battleship.firebaseapp.com",
    projectId: "archeun-battleship",
    databaseURL: "https://archeun-battleship-default-rtdb.firebaseio.com/",
    storageBucket: "archeun-battleship.appspot.com",
    messagingSenderId: "916359455856",
    appId: "1:916359455856:web:54d299a0a884ae9ab6c0b5"
});

const config = {
    type: Phaser.AUTO,
    width: Config.GAME_WINDOW.WIDTH,
    height: Config.GAME_WINDOW.HEIGHT,
    backgroundColor: Config.GAME_WINDOW.COLOR,
    physics: {
        default: 'arcade',
    },
    scene: [ArenaScene]
}

export default new Phaser.Game(config)

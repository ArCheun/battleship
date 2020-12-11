import firebase from "firebase";
import Config from "./Config";

const _ = require('lodash');

let instance = null;

class GameHandler {

    constructor() {
        if (!instance) {
            instance = this;
        }
        this.gameState = {
            "game": {},
            "gameCode": '',
            "my_boats": {
                "current": {"name": '', "alignment": Config.BOATS.ALIGNMENTS.HORIZONTAL}
            },
        };
        return instance;
    }

    getGameState() {
        return this.gameState;
    }

    getGameCode() {
        return this.gameState.gameCode;
    }

    getGameData() {
        return this.gameState.game;
    }

    getCurrentPlayerName() {
        return 'arunatebel';
    }

    getOpponentPlayerName() {
        return 'chayasan';
    }

    isOpponentBoardInteractive() {
        const currentPlayerGameData = this.getGameDataForCurrentPlayer();
        return this.gameState.game.config.status === Config.STATES.GAME.STARTED
            && currentPlayerGameData.player.config.status === Config.STATES.PLAYER.PENDING_ACTION;
    }

    isMyBoardInteractive() {
        const currentPlayerGameData = this.getGameDataForCurrentPlayer();
        return this.gameState.game.config.status === Config.STATES.GAME.INITIAL
            && currentPlayerGameData.player.config.status === Config.STATES.PLAYER.INITIAL;
    }

    getGameDataForCurrentPlayer() {
        return this.getGameDataForPlayer(this.getCurrentPlayerName());
    }

    getGameDataForOpponentPlayer() {
        return this.getGameDataForPlayer(this.getOpponentPlayerName());
    }

    getGameDataForPlayer(playerName) {
        let gameData = this.getGameData();
        if (gameData && gameData.boards) {
            return _.find(gameData.boards, (board) => {
                return board['player']['name'] === playerName;
            });
        }
        return [];
    }

    getGameBoardForPlayer(playerName) {
        const gameData = this.getGameDataForPlayer(playerName);
        if (gameData && gameData.hasOwnProperty('board')) {
            return gameData['board'];
        }
        return [];
    }

    async initGame() {
        const game = firebase.database().ref(`/games/${this.getGameCode()}`);
        const initialGameData = await game.once('value');
        this.setGameData(initialGameData.val());
        game.on('value', (snapshot) => {
            const gameData = snapshot.val();
            this.setGameData(gameData);
        });
    }

    setGameCode(code) {
        this.gameState.gameCode = code;
    }

    setGameData(gameData) {
        this.gameState.game = gameData;
    }

    setCurrentBoatType(currentBoatType) {
        this.gameState.my_boats.current.name = currentBoatType;
    }

    setCurrentBoatAlignment(currentBoatAlignment) {
        this.gameState.my_boats.current.alignment = currentBoatAlignment;
    }
}

export default GameHandler;
import Phaser from 'phaser'
import MyBoard from "./MyBoard";
import OpponentBoard from "./OpponentBoard";
import GameBoardHandler from "../util/GameBoardHandler";
import GameHandler from "../util/GameHandler";
import Config from "../util/Config";

export default class ArenaScene extends Phaser.Scene {
    constructor() {
        super('arena');
        this.gameBoardHandler = new GameBoardHandler();
        this.gameHandler = new GameHandler();
    }

    async preload() {
    }

    async create() {
        this.gameHandler.setGameCode('xyz789');
        await this.gameHandler.initGame();

        this.add.rectangle(Config.GAME_WINDOW.WIDTH / 2, Config.GAME_WINDOW.HEIGHT / 2, 5, Config.GAME_WINDOW.HEIGHT, 0xffffff);

        this.scene.add(
            'MyBoard',
            MyBoard,
            true,
            {gameBoardHandler: this.gameBoardHandler, gameHandler: this.gameHandler}
        );
        this.scene.add(
            'OpponentBoard',
            OpponentBoard,
            true,
            {gameBoardHandler: this.gameBoardHandler, gameHandler: this.gameHandler}
        );
    }

    update(time, delta) {
    }
}

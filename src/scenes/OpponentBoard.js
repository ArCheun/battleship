import Phaser from 'phaser'
import Config from "../util/Config";

export default class OpponentBoard extends Phaser.Scene {

    constructor() {
        super({key: 'OpponentBoard'});
        this.cells = [];
        this.gameState = {};
    }

    preload() {
        this.gameBoardHandler = this.scene.settings.data.gameBoardHandler;
        this.gameHandler = this.scene.settings.data.gameHandler;
        this.gameState = this.gameHandler.getGameState();
        const cellStartingX = (Config.GAME_WINDOW.WIDTH / 2 + Config.GAME_BOARD.CELL.WIDTH / 2 + Config.GAME_BOARD.CELL.SPACE * 2);
        const cellStartingY = Config.GAME_BOARD.CELL.WIDTH / 2 + Config.GAME_BOARD.CELL.SPACE;

        this.gameBoardConfig = {
            board: this,
            cellNamePrefix: 'opponent-cell',
            playerName: this.gameHandler.getOpponentPlayerName(),
            startingPoint: {x: cellStartingX, y: cellStartingY},
            interactive: this.gameHandler.isOpponentBoardInteractive(),
            cellPointerDownHandler: (cell, row, column) => {
                cell.setAlpha(0.5);
            },
            cellPointerUpHandler: (cell, row, column) => {
                cell.setAlpha(1);
            },
            cellPointerOutHandler: (cell, row, column) => {
                cell.setAlpha(1);
            },
            cellPointerOverHandler: (cell, row, column) => {
            }
        };
    }

    create() {
        this.cells = this.gameBoardHandler.drawBoard(this.gameBoardConfig);
        const opponentPlayerGameData = this.gameHandler.getGameDataForOpponentPlayer();

        const textStartPosX = (Config.GAME_WINDOW.WIDTH / 2) + Config.GAME_BOARD.CELL.SPACE * 2;
        const textStartPosY = ((Config.GAME_BOARD.CELL.HEIGHT + Config.GAME_BOARD.CELL.SPACE) * Config.GAME_BOARD.SIZE) + Config.GAME_BOARD.CELL.SPACE;
        this.add.text(textStartPosX, textStartPosY, `Player: ${this.gameHandler.getOpponentPlayerName()}`);
        this.add.text(textStartPosX, textStartPosY + Config.UI.TEXT.FONT.SIZE * Config.UI.TEXT.FONT.LINE_HEIGHT, `Status: ${opponentPlayerGameData.player.config.status}`);

    }

    update(time, delta) {
        this.gameBoardHandler.redrawBoard(this.cells, this.gameBoardConfig);
    }
}

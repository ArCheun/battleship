import Phaser from 'phaser'
import Config from "../util/Config";
import BoatYard from "./BoatYard";

export default class MyBoard extends Phaser.Scene {

    constructor() {
        super({key: 'MyBoard'});
        this.cells = [];
        this.gameState = {};
        this.currentPlayerGameData = {};
    }

    preload() {
        this.gameBoardHandler = this.scene.settings.data.gameBoardHandler;
        this.gameHandler = this.scene.settings.data.gameHandler;
        this.gameState = this.gameHandler.getGameState();
        this.currentPlayerGameData = this.gameHandler.getGameDataForCurrentPlayer();

        const CELL_CONFIG = Config.GAME_BOARD.CELL;

        this.gameBoardConfig = {
            board: this,
            cellNamePrefix: 'my-cell',
            playerName: this.gameHandler.getCurrentPlayerName(),
            startingPoint: {x: (CELL_CONFIG.WIDTH / 2 + CELL_CONFIG.SPACE), y: (CELL_CONFIG.HEIGHT / 2 + CELL_CONFIG.SPACE)},
            interactive: this.gameHandler.isMyBoardInteractive(),
            cellPointerDownHandler: (cell, row, column) => {
                cell.setAlpha(0.5);
            },
            cellPointerUpHandler: (cell, row, column) => {
                cell.setAlpha(1);
            },
            cellPointerOutHandler: (cell, row, column) => {
                this.gameBoardHandler.clearHighlightedCells(this.cells, row, column);
                cell.setAlpha(1);
            },
            cellPointerOverHandler: (cell, row, column) => {
                if (this.gameHandler.isMyBoardInteractive()) {
                    const gameState = this.gameHandler.getGameState();
                    if (gameState && gameState.my_boats.current && gameState.my_boats.current.name) {
                        this.gameBoardHandler.highlightCellsForShapePlacement(this.cells, row, column, gameState.my_boats.current);
                    }
                }
            }
        };
    }

    create() {
        this.cells = this.gameBoardHandler.drawBoard(this.gameBoardConfig);
        const currentPlayerGameData = this.gameHandler.getGameDataForCurrentPlayer();

        const textStartPosX = Config.GAME_BOARD.CELL.SPACE;
        const textStartPosY = ((Config.GAME_BOARD.CELL.HEIGHT + Config.GAME_BOARD.CELL.SPACE) * Config.GAME_BOARD.SIZE) + Config.GAME_BOARD.CELL.SPACE;
        const spaceBetweenLines = Config.UI.TEXT.FONT.SIZE * Config.UI.TEXT.FONT.LINE_HEIGHT;

        this.add.text(textStartPosX, textStartPosY, `Player: ${this.gameHandler.getCurrentPlayerName()}`);
        this.add.text(textStartPosX, textStartPosY + spaceBetweenLines, `Status: ${currentPlayerGameData.player.config.status}`);

        this.add.rectangle(Config.GAME_WINDOW.WIDTH / 2, textStartPosY + Config.GAME_BOARD.CELL.SPACE + spaceBetweenLines * 2, Config.GAME_WINDOW.WIDTH, 5, 0xffffff);

        this.scene.add(
            'BoatYard',
            BoatYard,
            true,
            {
                gameBoardHandler: this.gameBoardHandler,
                gameHandler: this.gameHandler,
                startPosition: {x: 0, y: textStartPosY + Config.GAME_BOARD.CELL.SPACE + spaceBetweenLines * 2}
            }
        );

    }

    update(time, delta) {
        this.gameBoardHandler.redrawBoard(this.cells, this.gameBoardConfig);
    }
}

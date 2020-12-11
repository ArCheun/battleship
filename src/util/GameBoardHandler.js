import GameHandler from "./GameHandler";
import Config from "./Config";

const _ = require('lodash');

class GameBoardHandler {

    constructor(props) {
        this.gameHandler = new GameHandler();
    }

    getColorForCell(cellData) {
        let color = 0xffffff;
        const BOAT_TYPES = Config.BOATS.TYPES;
        if (cellData.o === BOAT_TYPES.CARRIER.size) {
            color = BOAT_TYPES.CARRIER.color;
        } else if (cellData.o === BOAT_TYPES.BATTLESHIP.size) {
            color = BOAT_TYPES.BATTLESHIP.color;
        } else if (cellData.o === BOAT_TYPES.CRUISER.size) {
            color = BOAT_TYPES.CRUISER.color;
        } else if (cellData.o === BOAT_TYPES.DESTROYER.size) {
            color = BOAT_TYPES.DESTROYER.color;
        }
        return color;
    }

    drawBoard(gameBoardConfig) {
        const BOARD_CONFIG = Config.GAME_BOARD;
        const CELL_CONFIG = BOARD_CONFIG.CELL;

        let cells = _.chunk(_.range(0, Math.pow(BOARD_CONFIG.SIZE, 2), BOARD_CONFIG.SIZE));
        let cell, cellX, cellY;
        let gameData = this.gameHandler.getGameBoardForPlayer(gameBoardConfig.playerName);

        for (let i = 0; i < BOARD_CONFIG.SIZE; i++) {
            for (let j = 0; j < BOARD_CONFIG.SIZE; j++) {
                let color = this.getColorForCell(gameData[i][j]);
                cellX = j * (CELL_CONFIG.WIDTH + CELL_CONFIG.SPACE) + gameBoardConfig.startingPoint.x;
                cellY = i * (CELL_CONFIG.WIDTH + CELL_CONFIG.SPACE) + gameBoardConfig.startingPoint.y
                cell = gameBoardConfig.board.add.rectangle(cellX, cellY, CELL_CONFIG.WIDTH, CELL_CONFIG.HEIGHT, color);

                if (gameBoardConfig.interactive) {
                    cell.setInteractive();
                    this.attachEventHandlersToCell(cell, gameBoardConfig, i, j);
                }
                cells[i][j] = cell;
            }
        }
        return cells;
    }

    attachEventHandlersToCell(cell, gameBoardConfig, i, j) {
        cell.on('pointerdown', function (pointer) {
            gameBoardConfig.cellPointerDownHandler(this, i, j);
        });

        cell.on('pointerup', function (pointer) {
            gameBoardConfig.cellPointerUpHandler(this, i, j);
        });

        cell.on('pointerover', function (pointer) {
            gameBoardConfig.cellPointerOverHandler(this, i, j);
        });

        cell.on('pointerout', function (pointer) {
            gameBoardConfig.cellPointerOutHandler(this, i, j);
        });
    }

    redrawBoard(cells, boardData) {
        let gameData = this.gameHandler.getGameBoardForPlayer(boardData.playerName);
        for (let i = 0; i < gameData.length; i++) {
            for (let j = 0; j < gameData[i].length; j++) {
                cells[i][j].setFillStyle(this.getColorForCell(gameData[i][j]));
            }
        }
    }

    clearRowCellsHighlight(cells, row) {
        for (let i = 0; i < Config.GAME_BOARD.SIZE; i++) {
            cells[row][i].setAlpha(1);
        }
    }

    clearColumnCellsHighlight(cells, pointerOnColumn) {
        for (let i = 0; i < Config.GAME_BOARD.SIZE; i++) {
            cells[i][pointerOnColumn].setAlpha(1);
        }
    }

    clearHighlightedCells(cells, pointerOnRow, pointerOnColumn) {
        this.clearRowCellsHighlight(cells, pointerOnRow);
        this.clearColumnCellsHighlight(cells, pointerOnColumn);
    }

    highlightCellsForShapePlacement(cells, pointerOnRow, pointerOnColumn, selectedBoat) {
        let cellCoordsToHighlight = this.getCellsCoordsToHighlight(pointerOnRow, pointerOnColumn, selectedBoat);
        _.each(cellCoordsToHighlight, (val, key) => {
            cells[val.row][val.column].setAlpha(0.3);
        });
    }

    getCellsCoordsToHighlight(currentRow, currentColumn, selectedBoat) {
        let cellCoordsToHighlight = [];
        const cellCount = this.getCellCountForBoatType(selectedBoat.name);
        if (cellCount > 0) {
            if (selectedBoat.alignment === Config.BOATS.ALIGNMENTS.HORIZONTAL && currentColumn + cellCount <= Config.GAME_BOARD.SIZE) {
                cellCoordsToHighlight = Array(cellCount).fill(0).map((item, i) => {
                    return {row: currentRow, column: currentColumn + i};
                });
            } else if (selectedBoat.alignment === Config.BOATS.ALIGNMENTS.VERTICAL && currentRow + cellCount <= Config.GAME_BOARD.SIZE) {
                cellCoordsToHighlight = Array(cellCount).fill(0).map((item, i) => {
                    return {row: currentRow + i, column: currentColumn};
                });
            }
        }
        return cellCoordsToHighlight;
    }

    getCellCountForBoatType(boatType) {
        let cellCount;
        const BOAT_TYPES = Config.BOATS.TYPES;
        if (boatType === BOAT_TYPES.CARRIER.name) {
            cellCount = BOAT_TYPES.CARRIER.size;
        } else if (boatType === BOAT_TYPES.BATTLESHIP.name) {
            cellCount = BOAT_TYPES.BATTLESHIP.size;
        } else if (boatType === BOAT_TYPES.CRUISER.name) {
            cellCount = BOAT_TYPES.CRUISER.size;
        } else if (boatType === BOAT_TYPES.DESTROYER.name) {
            cellCount = BOAT_TYPES.DESTROYER.size;
        } else {
            cellCount = 0;
        }
        return cellCount;
    }

    drawBoat(board, boatConfig) {
        const boatSize = boatConfig.type.size;
        const color = boatConfig.type.color;
        const CELL_CONFIG = Config.GAME_BOARD.CELL;
        const x = boatConfig.x + (CELL_CONFIG.WIDTH / 2) + CELL_CONFIG.SPACE;
        const y = boatConfig.y + CELL_CONFIG.SPACE;
        for (let i = 0; i < boatSize; i++) {
            let boatCell;
            if (boatConfig.alignment === Config.BOATS.ALIGNMENTS.HORIZONTAL) {
                boatCell = board.add.rectangle(x + (i * (CELL_CONFIG.WIDTH + CELL_CONFIG.SPACE)), y, CELL_CONFIG.WIDTH, CELL_CONFIG.HEIGHT, color);
            } else {
                boatCell = board.add.rectangle(x, y + (i * (CELL_CONFIG.HEIGHT + CELL_CONFIG.SPACE)), CELL_CONFIG.WIDTH, CELL_CONFIG.HEIGHT, color);
            }
            boatCell.setInteractive();
            boatCell.on('pointerup', function (pointer) {
                boatConfig.onClick(this, pointer);
            });
        }
    }

}

export default GameBoardHandler;
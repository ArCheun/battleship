import Phaser from 'phaser'
import Config from "../util/Config";
import {TextButton} from "../util/TextButton";

export default class BoatYard extends Phaser.Scene {

    constructor() {
        super({key: 'BoatYard'});
    }

    preload() {
        this.startPosition = this.scene.settings.data.startPosition;
        this.gameBoardHandler = this.scene.settings.data.gameBoardHandler;
        this.gameHandler = this.scene.settings.data.gameHandler;
    }

    create() {

        let startPos = this.startPosition;
        const CELL_CONFIG = Config.GAME_BOARD.CELL;
        const horizontalSpace = CELL_CONFIG.HEIGHT + CELL_CONFIG.SPACE;

        this.add.text(Config.GAME_BOARD.CELL.SPACE, startPos.y + CELL_CONFIG.SPACE, 'Select a boat and its alignment', {fontSize: '12px'});

        startPos.y += (CELL_CONFIG.HEIGHT / 2) + (Config.UI.TEXT.FONT.SIZE * Config.UI.TEXT.FONT.LINE_HEIGHT);

        this.gameBoardHandler.drawBoat(this, {
            type: Config.BOATS.TYPES.DESTROYER,
            x: startPos.x,
            y: startPos.y,
            alignment: Config.BOATS.ALIGNMENTS.HORIZONTAL,
            onClick: (cell, pointer) => {
                this.gameHandler.setCurrentBoatType(Config.BOATS.TYPES.DESTROYER.name);
            }
        });

        this.gameBoardHandler.drawBoat(this, {
            type: Config.BOATS.TYPES.CRUISER,
            x: startPos.x,
            y: startPos.y + horizontalSpace,
            alignment: Config.BOATS.ALIGNMENTS.HORIZONTAL,
            onClick: (cell, pointer) => {
                this.gameHandler.setCurrentBoatType(Config.BOATS.TYPES.CRUISER.name);
            }
        });

        this.gameBoardHandler.drawBoat(this, {
            type: Config.BOATS.TYPES.BATTLESHIP,
            x: startPos.x,
            y: startPos.y + horizontalSpace * 2,
            alignment: Config.BOATS.ALIGNMENTS.HORIZONTAL,
            onClick: (cell, pointer) => {
                this.gameHandler.setCurrentBoatType(Config.BOATS.TYPES.BATTLESHIP.name);
            }
        });

        this.gameBoardHandler.drawBoat(this, {
            type: Config.BOATS.TYPES.CARRIER,
            x: startPos.x,
            y: startPos.y + horizontalSpace * 3,
            alignment: Config.BOATS.ALIGNMENTS.HORIZONTAL,
            onClick: (cell, pointer) => {
                this.gameHandler.setCurrentBoatType(Config.BOATS.TYPES.CARRIER.name);
            }
        });

        const textStartPosY = startPos.y + Config.GAME_BOARD.CELL.SPACE + horizontalSpace * 3.4;

        this.add.existing(
            new TextButton(this, Config.GAME_BOARD.CELL.SPACE, textStartPosY + (Config.UI.TEXT.FONT.SIZE), 'VERTICAL',
                {fill: '#0f0', fontSize: '12px'},
                () => {
                    this.gameHandler.setCurrentBoatAlignment(Config.BOATS.ALIGNMENTS.VERTICAL);
                }
            )
        );

        this.add.text(65, textStartPosY + (Config.UI.TEXT.FONT.SIZE), '|', {fontSize: '12px'});

        this.add.existing(
            new TextButton(this, 75, textStartPosY + (Config.UI.TEXT.FONT.SIZE), 'HORIZONTAL',
                {fill: '#0f0', fontSize: '12px'},
                () => {
                    this.gameHandler.setCurrentBoatAlignment(Config.BOATS.ALIGNMENTS.HORIZONTAL);
                }
            )
        );

    }

    update(time, delta) {

    }
}
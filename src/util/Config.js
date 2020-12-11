export default {
    GAME_WINDOW: {
        WIDTH: 720,
        HEIGHT: 600,
        COLOR: '#000000',
    },
    STATES: {
        GAME: {INITIAL: 'initial', STARTED: 'started'},
        PLAYER: {INITIAL: 'initial', PENDING_ACTION: 'pending-action'}
    },
    GAME_BOARD: {
        SIZE: 10,
        CELL: {WIDTH: 30, HEIGHT: 30, SPACE: 5},
    },
    BOATS: {
        TYPES: {
            CARRIER: {name: 'carrier', size: 2, color: 0xfcba03},
            BATTLESHIP: {name: 'battleship', size: 3, color: 0x00ff1e},
            CRUISER: {name: 'cruiser', size: 4, color: 0x0026ff},
            DESTROYER: {name: 'destroyer', size: 5, color: 0xff00f7}
        },
        ALIGNMENTS: {
            HORIZONTAL: 'H',
            VERTICAL: 'V',
        }
    },
    UI: {
        TEXT: {FONT: {SIZE: 10, LINE_HEIGHT: 2}}
    }
};
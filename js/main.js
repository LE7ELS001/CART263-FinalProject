"use strict"

const MAP_WIDTH = 1920;
// const WIDTH = document.body.offsetWidth;
const WIDTH = 800;
const HEIGHT = 600;
const ZOOM_FACTOR = 1.5

let config = {
    type: Phaser.AUTO,
    mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
    ZoomFactor: ZOOM_FACTOR,
    width: 800,
    height: HEIGHT,
    pixelArt: true,
    leftTopCorner: {
        x: (WIDTH - (WIDTH / ZOOM_FACTOR)) / 2,
        y: (HEIGHT - (HEIGHT / ZOOM_FACTOR)) / 2
    },
    rightTopCorner: {
        x: ((WIDTH / ZOOM_FACTOR) + ((WIDTH - (WIDTH / ZOOM_FACTOR)) / 2)),
        y: (HEIGHT - (HEIGHT / ZOOM_FACTOR)) / 2

    },
    parent: 'game-container',
    physics: {
        debug: false,
        default: 'arcade',
    },





    scene: [Boot, Scene1]
}

let game = new Phaser.Game(config);
game.registry.set("gameConfig", {
    mapOffset: config.mapOffset,
    width: config.width,
    height: config.height,
    ZoomFactor: config.ZoomFactor,
    leftTopCorner: config.leftTopCorner,
    rightTopCorner: config.rightTopCorner
});


function BoarAnims(anims) {
    if (!anims.exists('boarIdle')) {
        anims.create({
            key: "boarIdle",
            frames: anims.generateFrameNumbers("Boar-idle", {
                start: 0,
                end: 3
            }),
            frameRate: 8,
            repeat: -1
        });
    }

    if (!anims.exists('boarRun')) {
        anims.create({
            key: "boarRun",
            frames: anims.generateFrameNumbers("Boar-run", {
                start: 0,
                end: 5
            }),
            frameRate: 15,
            repeat: -1
        });
    }

    if (!anims.exists('boarWalk')) {
        anims.create({
            key: "boarWalk",
            frames: anims.generateFrameNumbers("Boar-walk", {
                start: 0,
                end: 5
            }),
            frameRate: 12,
            repeat: -1
        });

    }
}

window.BoarAnims = BoarAnims;
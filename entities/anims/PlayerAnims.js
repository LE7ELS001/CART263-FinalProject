
function PlayerAnimation(anims) {
    if (!anims.exists('idle')) {

        anims.create({
            key: "idle",
            frames: anims.generateFrameNumbers("avatar-idle", {
                start: 0,
                end: 9
            }),
            frameRate: 8,
            repeat: -1
        });
    }

    if (!anims.exists('run')) {
        anims.create({
            key: "run",
            frames: anims.generateFrameNumbers("avatar-run", {
                start: 0,
                end: 9
            }),
            frameRate: 15,
            repeat: -1
        });
    }

    if (!anims.exists('attack1')) {

        anims.create({
            key: "attack1",
            frames: anims.generateFrameNumbers("attack1", { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        });
    }

    if (!anims.exists('attack2')) {

        anims.create({
            key: "attack2",
            frames: anims.generateFrameNumbers("attack2", { start: 0, end: 5 }),
            frameRate: 15,
            repeat: 0
        });
    }

    if (!anims.exists('roll')) {

        anims.create({
            key: "roll",
            frames: anims.generateFrameNumbers("roll", { start: 0, end: 11 }),
            frameRate: 22,
            repeat: 0
        });
    }


    if (!anims.exists('jump')) {
        anims.create({
            key: "jump",
            frames: anims.generateFrameNumbers("avatar-jump", {
                start: 0,
                end: 2
            }),
            frameRate: 12,
            repeat: -1
        });
    }
    if (!anims.exists('fall')) {
        anims.create({
            key: "fall",
            frames: anims.generateFrameNumbers("avatar-fall", {
                start: 0,
                end: 2
            }),
            frameRate: 12,
            repeat: -1,


        });
    }

    if (!anims.exists('jumpfall')) {
        anims.create({
            key: "jumpfall",
            frames: anims.generateFrameNumbers("avatar-Jumpfall", {
                start: 0,
                end: 1
            }),
            frameRate: 10,
            repeat: 0,
            //stopOnLastFrame: true

        });
    }

    if (!anims.exists('wallslide')) {

        anims.create({
            key: "wallslide",
            frames: anims.generateFrameNumbers("avatar-wallslide", {
                start: 0,
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    if (!anims.exists('takesHit')) {

        anims.create({
            key: "takesHit",
            frames: [{ key: 'avatar-takesHit', frame: 0 }],
            frameRate: 1,
            repeat: -1
        });
    }

    if (!anims.exists('launch')) {
        anims.create({
            key: "launch",
            frames: anims.generateFrameNumbers("attack1", { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        });
    }

    if (!anims.exists('jump2')) {
        anims.create({
            key: "jump2",
            frames: anims.generateFrameNumbers("avatar-jump2", { start: 0, end: 10 }),
            frameRate: 15,
            repeat: 0
        });
    }

    if (!anims.exists('wind-1')) {
        anims.create({
            key: "wind-1",
            frames: anims.generateFrameNumbers("wind1", { start: 0, end: 8 }),
            frameRate: 15,
            repeat: 0
        });
    }

    if (!anims.exists('death')) {
        anims.create({
            key: "death",
            frames: anims.generateFrameNumbers("avatar-death", { start: 0, end: 9 }),
            frameRate: 8,
            repeat: 0
        });
    }
}


window.PlayerAnimation = PlayerAnimation;
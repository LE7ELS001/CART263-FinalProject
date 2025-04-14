function MushRoomAnims(anims) {
    if (!anims.exists('MushroomRun')) {
        anims.create({
            key: "MushroomRun",
            frames: anims.generateFrameNumbers("Mushroom-run", {
                start: 0,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        });
    }

    if (!anims.exists('mushroomProjectile')) {
        anims.create({
            key: "mushroomProjectile",
            frames: anims.generateFrameNumbers("mushroom_Projectile", {
                start: 0,
                end: 3
            }),
            frameRate: 8,
            repeat: 0
        });
    }

    if (!anims.exists('MushroomIdle')) {
        anims.create({
            key: "MushroomIdle",
            frames: anims.generateFrameNumbers("Mushroom-idle", {
                start: 0,
                end: 3
            }),
            frameRate: 15,
            repeat: 0
        });
    }
}

window.MushRoomAnims = MushRoomAnims;
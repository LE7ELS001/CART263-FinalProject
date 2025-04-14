function effectAnims(anims) {
    if (!anims.exists('enemyDead')) {
        anims.create({
            key: "enemyDead",
            frames: anims.generateFrameNumbers("enemy_dead", { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 0
        });
    }
}

window.effectAnims = effectAnims;
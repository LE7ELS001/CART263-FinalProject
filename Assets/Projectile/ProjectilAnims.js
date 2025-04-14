function projectilesAnimation(anims) {
    if (!anims.exists('playerProjectile')) {

        anims.create({
            key: "playerProjectile",
            frames: anims.generateFrameNumbers("player_Projectile", { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });
    }
}

window.projectilesAnimation = projectilesAnimation;

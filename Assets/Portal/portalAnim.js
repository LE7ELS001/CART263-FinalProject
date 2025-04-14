
function portalAnimation(anims) {
    if (!anims.exists('portal_1')) {
        anims.create({
            key: "portal_1",
            frames: anims.generateFrameNumbers("portal-1", {
                start: 0,
                end: 2
            }),
            frameRate: 7,
            repeat: -1
        });
    }

    if (!anims.exists('portal_2')) {
        anims.create({
            key: "portal_2",
            frames: anims.generateFrameNumbers("portal-2", {
                start: 0,
                end: 2
            }),
            frameRate: 7,
            repeat: -1
        });
    }
}

window.portalAnimation = portalAnimation;
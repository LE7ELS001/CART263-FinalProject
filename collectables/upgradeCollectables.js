

class upgradeCollectables extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        scene.add.existing(this);

        this.setOrigin(0, 1);
        scene.tweens.add({
            targets: this,
            y: this.y - 7,
            duration: Phaser.Math.Between(1500, 2500),
            repeat: -1,
            easy: 'linear',
            yoyo: true
        })
    }


}

window.upgradeCollectables = upgradeCollectables;
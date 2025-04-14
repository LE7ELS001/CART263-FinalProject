
class spriteEffect extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, effectName) {
        super(scene, x, y, effectName);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.target = null;
        this.effectName = effectName;

        this.on('animationcomplete', animation => {
            if (animation.key === this.effectName) {
                this.destroy();
            }
        }, this);

    }

    //if you use flashing effect, you can use this when enemies is dead
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.placeEffect();
    }

    placeEffect(offsetX = 0, offsetY = 0) {
        if (!this.target || !this.body) { return; }
        const center = this.target.getCenter();
        this.body.reset(center.x + offsetX, center.y + offsetY);
    }

    playOn(target) {
        this.target = target;
        this.play(this.effectName, true);
        this.placeEffect();
    }
}

window.spriteEffect = spriteEffect;
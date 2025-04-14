


class Mushroom extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'MushroomRun');

        MushRoomAnims(scene.anims);
        this.init();


    }

    init() {
        super.init();

        this.Speed = 55;
        this.maxMoveDistance = 200;
        this.damage = 25;
        this.projectilePool = new ProjectilesPool(this.scene, "mushroomProjectile");
        this.timeFromLastShot = 0;
        this.attackDelay = this.getAttackDelay();
        this.lastDirection = null;
    }

    update(time, delta) {
        if (!this.active) { return; }
        this.adjustSizeOnFlip();
        super.update(time, delta);


        if (this.timeFromLastShot + this.attackDelay <= time) {
            this.projectilePool.fireProjectile(this);

            this.timeFromLastShot = time;
            this.attackDelay = this.getAttackDelay();
        }

        if (this.Speed === 0) {

            this.play("MushroomIdle", true);
        }
        else {
            this.play("MushroomRun", true);
        }

        if (this.body.velocity.x > 0) {
            this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
        }
        else {
            this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
        }

        this.flipX = this.Speed < 0;

    }


    adjustSizeOnFlip() {
        if (this.flipX) {
            this.setSize(15, 36);
            this.setOffset(67, 2);

        } else {
            this.setSize(15, 36);
            this.setOffset(69, 2);

        }
    }

    getAttackDelay() {
        return Phaser.Math.Between(1000, 4000);
    }

    isDead() {
        return !this.active || this.health <= 0;
    }

}






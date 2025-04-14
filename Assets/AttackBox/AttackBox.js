class AttackBox extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, weaponName, damage) {
        super(scene, x, y, weaponName);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.body.allowGravity = false;

        this.scene = scene;
        this.damage = damage;
        this.owner = null;

        this.offsetX = 42;
        this.offsetY = 20;
        this.setSize(70, 45)

        this.setOrigin(0.5, 1);
        //this.setDepth(10);

        this.activeAttackBox(false);


    }


    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (!this.active) {
            return;
        }

        if (this.owner.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
            this.setFlipX(false);
            this.body.reset(this.owner.x + this.offsetX, this.owner.y - this.offsetY);
        } else {
            this.setFlipX(true);
            this.body.reset(this.owner.x - this.offsetX, this.owner.y - this.offsetY);
        }


    }

    swing(owner) {
        this.owner = owner;
        this.activeAttackBox(true);
        this.body.reset(owner.x, owner.y);
        //console.log("attack");

    }

    activeAttackBox(isActive) {
        this.setActive(isActive);
        this.setVisible(isActive);
        this.body.reset(0, 0);

        if (!isActive) {
            this.body.checkCollision.none = false;
        }

    }

    deliverHit(target) {
        this.body.checkCollision.none = true;

        //this.effectManager.playEffectOn("enemyDead", target);



    }
}

window.AttackBox = AttackBox;
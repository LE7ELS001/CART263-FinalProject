class Enemy_projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = 250;
        this.maxDistance = 550;
        this.traveledDistance = 0;
        this.key = key;
        this.damage = 30;
        this.coolDown = 1000;
        this.projectileWdith = 50;
        this.projectileHeight = 50;
        this.isUsed = false;


        switch (key) {
            case 'mushroomProjectile':
                this.setSize(10, 10);
                this.setOffset(19, 21);
                this.setScale(2.5);
                this.setOrigin(0.5, 0.5);
                this.maxDistance = 250;
                break;
        }


        this.effectManager = new effectManager(this.scene);


    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.traveledDistance += this.body.deltaAbsX();

        if (this.isOutOfRange()) {
            this.body.reset(0, 0)
            this.activeProjectile(false);
            this.traveledDistance = 0;
        }
    }

    fire(x, y) {
        this.isUsed = false;
        this.activeProjectile(true);
        this.body.reset(x, y);

        this.anims.stop();
        this.play(this.key, true);
        // this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        //     if (!this.isUsed) {
        //         this.cleanupProjectile();
        //     }
        // });
        this.setVelocityX(this.speed);
    }

    tryHitPlayer(player) {
        if (!this.isUsed && !player.invincible) {
            this, this.isUsed = true;
            player.takesHit(this);
            this.cleanupProjectile();
            this.scene.time.delayedCall(1000, () => {
                this.isHitPlayer = false;
            });
        }
        else if (player.invincible) {
            this.cleanupProjectile();
        }
    }

    deliverHit(target) {
        if (!this.isUsed) {

            this.cleanupProjectile();
        }
        //this.effectManager.playEffectOn("enemyDead", target);



    }

    activeProjectile(isActive) {
        this.setActive(isActive);
        this.setVisible(isActive);

    }

    isOutOfRange() {
        return this.traveledDistance &&
            this.traveledDistance >= this.maxDistance;
    }

    cleanupProjectile() {
        this.isUsed = true;
        this.activeProjectile(false);
        this.traveledDistance = 0;
        this.body.reset(0, 0);
    }


}

window.Enemy_projectile = Enemy_projectile;

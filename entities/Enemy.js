


class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        Object.assign(this, CollisionMixin);
        this.gameConfig = scene.registry.get("gameConfig");
        this.init();
        this.initEvents();

        this.effectManager = new effectManager(this.scene);


    }



    init() {
        this.deadHeight = this.gameConfig.height;
        this.gravity = 500;
        this.Speed = 75;
        this.health = 30;
        this.damage = 25;
        this.scale = 1.5;
        this.resetTimeAfterTurn = 0;
        this.maxMoveDistance = 100;
        this.currentDistance = 0;
        this.platformColliders = null;
        this.isHitPlayer = false;
        this.rayGraphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } });

        this.hitSound = this.scene.sound.add('hit', { volume: 0.2 });
        this.hitSound2 = this.scene.sound.add('hit2', { volume: 0.2 });

        this.body.setGravityY(this.gravity);
        this.setScale(this.scale);
        // this.setSize(27, 27);
        // this.setOffset(7, 6);
        this.setSize(27, 27);
        this.setOffset(13, 6);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.setOrigin(0.5, 1);
        this.setVelocityX(-this.Speed);
        BoarAnims(this.scene.anims);
        effectAnims(this.scene.anims, this.scene);

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(time) {
        if (this.getBounds().bottom > this.deadHeight) {
            this.scene.events.removeListener(Phaser.Scenes.Events.UPDATE, this.update, this);
            this.setActive(false);
            this.rayGraphics.clear();
            this.destroy();
            return;
        }

        this.patrol(time);


    }

    patrol(time) {
        if (!this.body || !this.body.onFloor()) {
            return;
        }

        this.currentDistance += Math.abs(this.body.deltaX());
        const { ray, hitTheLayer } = this.raycast(this.body, this.platformColliders, { rayLength: 30, precision: 1, steepnes: 0.5 });

        if ((!hitTheLayer || this.currentDistance >= this.maxMoveDistance) &&
            this.resetTimeAfterTurn + 100 < time) {
            this.setFlipX(this.Speed < 0);
            this.setVelocityX(this.Speed = -this.Speed);
            this.resetTimeAfterTurn = time;
            this.currentDistance = 0;
        }

        // this.rayGraphics.clear();
        // this.rayGraphics.lineStyle(2, 0xff0000);
        // this.rayGraphics.strokeLineShape(ray.edgeLine);
        // this.rayGraphics.lineStyle(2, 0x0000ff);
        // this.rayGraphics.strokeLineShape(ray.wallLine);
    }

    setPlatformColliders(platformColliders) {
        this.platformColliders = platformColliders;
    }

    deliverHit(player) {

    }
    takesHit(source) {
        source.deliverHit(this);
        this.health -= source.damage;

        const tween = this.playDamageTween();

        this.hitSound2.play();



        if (this.health <= 0) {
            const deathX = this.x;
            const deathY = this.y;
            tween.on('complete', () => {
                // this.effectManager.playEffectOn("enemyDead", this);
                this.playDeathAnimation();
                this.setActive(false);
                this.setVisible(false);
                this.body.checkCollision.none = true;
                console.log('enemy is dead');
            });
        }
    }

    playDeathAnimation() {
        const deathX = this.body.center.x;
        const deathY = this.body.bottom;


        const deathEffect = this.scene.add.sprite(deathX, deathY, 'enemy_dead')
            .setOrigin(0.5, 1)
            .setScale(this.scale)
            .setDepth(this.depth)
            .play('enemyDead');


        deathEffect.once('animationcomplete', () => {
            deathEffect.destroy();
        });



    }




    playDamageTween() {
        if (this.damageTween && this.damageTween.isPlaying()) {
            this.damageTween.stop();
        }


        const flashColor = 0xffffff;
        const flashDuration = 15;
        const flashRepeats = 2;

        this.setTintFill(flashColor);

        // this.damageTween = this.scene.tweens.add({
        //     targets: this,
        //     duration: flashDuration,
        //     repeat: flashRepeats,
        //     yoyo: true,
        //     ease: 'Linear',
        //     alpha: { from: 1, to: 0.5 },
        //     onComplete: () => {
        //         this.clearTint();
        //         this.setAlpha(1);
        //     }
        // });
        return this.damageTween = this.scene.tweens.add({
            targets: this,
            duration: flashDuration,
            repeat: flashRepeats,
            yoyo: true,
            ease: 'Linear',
            alpha: { from: 1, to: 0.5 },
            onComplete: () => {
                this.clearTint();
                this.setAlpha(1);
            }
        });
    }

    tryHitPlayer(player) {
        if (!this.isHitPlayer && !player.invincible) {
            this.isHitPlayer = true;
            player.takesHit(this);
            this.scene.time.delayedCall(1000, () => {
                this.isHitPlayer = false;
            });
        }
    }

}






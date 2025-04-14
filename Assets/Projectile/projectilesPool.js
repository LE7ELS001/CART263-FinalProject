
class ProjectilesPool extends Phaser.Physics.Arcade.Group {
    constructor(scene, key = 'playerProjectile') {
        super(scene.physics.world, scene);


        this.key = key;
        let projcetileClass;

        switch (key) {
            case 'playerProjectile':
                projcetileClass = Player_projectile;
                this.createMultiple({
                    frameQuantity: 3,
                    active: false,
                    visible: false,
                    key: this.key,
                    classType: projcetileClass
                });
                break;
            case "mushroomProjectile":
                projcetileClass = Enemy_projectile;
                this.createMultiple({
                    frameQuantity: 10,
                    active: false,
                    visible: false,
                    key: this.key,
                    classType: projcetileClass
                });
                break;
        }



        this.timeFromLastShoot = null;
    }


    fireProjectile(initiator, x = 0, y = 0) {
        const projectile = this.getFirstDead(false);

        const center = initiator.getCenter();
        let centerX = center.x + x;
        let centerY = center.y + y;

        if (!projectile) {
            return;
        }

        if (this.timeFromLastShoot &&
            this.timeFromLastShoot + projectile.coolDown > getTimeStamp()
        ) {
            return;
        }

        if (initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
            projectile.speed = Math.abs(projectile.speed);
            projectile.setFlipX(false);
            centerX = center.x + 15;
        }
        else {
            projectile.speed = -Math.abs(projectile.speed);
            projectile.setFlipX(true);
            centerX = center.x - 15;

        }

        projectile.fire(centerX, centerY);
        this.timeFromLastShoot = getTimeStamp();

    }




}

window.ProjectilesPool = ProjectilesPool;


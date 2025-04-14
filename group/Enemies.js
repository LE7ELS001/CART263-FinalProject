
class Enemies extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);
    }

    getProjectiles() {
        const projectiles = new Phaser.GameObjects.Group();
        this.getChildren().forEach(enemy => {
            enemy.projectilePool && projectiles.addMultiple(enemy.projectilePool.getChildren())
        });
        return projectiles;
    }

    getTypes() {
        return getEnemyTypes();
    }
}
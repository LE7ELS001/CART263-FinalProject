


class Boar extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'Boar-idle');

        BoarAnims(scene.anims);

    }

    update(time, delta) {
        if (!this.active) { return; }
        this.adjustSizeOnFlip();
        super.update(time, delta);

        if (this.Speed === 0) {

            this.play("boarIdle", true);
        }
        else {
            this.play("boarRun", true);
        }

    }


    adjustSizeOnFlip() {

        if (this.flipX) {
            this.setSize(27, 27);
            this.setOffset(13, 6);

        } else {
            this.setSize(27, 27);
            this.setOffset(7, 6);

        }
    }

}




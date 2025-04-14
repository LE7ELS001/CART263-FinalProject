class manaBar {
    constructor(scene, x, y, scale = 1, mana) {
        this.bar = new Phaser.GameObjects.Graphics(scene);


        this.x = x / scale;
        this.y = y / scale;
        this.scale = scale;
        this.maxMana = mana;
        this.currentMana = this.maxMana;

        this.size = {
            width: 90,
            height: 10,
        }

        this.pixelperMana = this.size.width / this.maxMana;

        scene.add.existing(this.bar);
        this.draw(this.x, this.y, this.scale);
    }

    increasePlayerMaxMana(amount) {
        this.maxMana += amount;
        this.currentMana = this.maxMana;
        console.log('active')
        this.size.width = this.size.width + amount * this.pixelperMana
        this.pixelperMana = this.size.width / this.maxMana;
        this.draw(this.x, this.y, this.scale);
    }


    decrease(amount) {
        if (amount <= 0) {
            this.currentMana = 0;
        }
        else {
            this.currentMana = amount;
        }

        //this.currentMana = amount;
        this.draw(this.x, this.y, this.scale);
    }


    draw(x, y, scale) {
        this.bar.clear();
        const { width, height } = this.size;

        const margin = 1;

        //this.bar.fillStyle(0x08f90f);
        //this.bar.fillRect(x, y, width + margin, height + margin);
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(
            x - margin,
            y - margin,
            width + margin * 2,
            height + margin * 2
        );

        this.bar.fillStyle(0xFFFFFF)
        //this.bar.fillRect(x + margin, y + margin, width - margin, height - margin);
        this.bar.fillRect(
            x,
            y,
            width,
            height
        );

        const manaWidth = Math.round(this.currentMana * this.pixelperMana);
        //console.log(healthWidth)

        if (manaWidth <= 0.3) {
            this.bar.fillStyle(0x003f7f);
        } else if (manaWidth <= 0.6) {
            this.bar.fillStyle(0x0079b5);
        } else {
            this.bar.fillStyle(0x00c9ed);
        }


        if (manaWidth > 0) {
            //this.bar.fillRect(x + margin, y + margin, healthWidth - margin, height - margin);
            this.bar.fillRect(
                x,
                y,
                manaWidth,
                height
            );
        }

        return this.bar
            .setScrollFactor(0, 0)
            .setScale(scale);
    }

}

window.manaBar = manaBar;

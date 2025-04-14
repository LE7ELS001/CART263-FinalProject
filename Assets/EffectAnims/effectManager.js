
class effectManager {
    constructor(scene) {
        this.scene = scene;

    }

    // playEffectOn(effectName, target) {
    //     const effect = new spriteEffect(this.scene, 0, 0, effectName);
    //     effect.playOn(target);
    // }

    playEffectOn(effectName, target) {
        const effect = new spriteEffect(this.scene, 0, 0, effectName);
        effect.playOn(target);
    }


}

window.effectManager = effectManager;
function isPlaying(gameObject, animsKey) {
    return gameObject.anims &&
        gameObject.anims.isPlaying &&
        gameObject.anims.currentAnim &&
        gameObject.anims.currentAnim.key === animsKey;
}

window.isPlaying = isPlaying;
// wave-animation-worklet.js
registerAnimator('wave-animation', class {
    constructor(options) {
        this.offset = 0; // Initial offset for the wave animation
    }

    animate(currentTime, effect) {
        this.offset += 1; // Increase offset for every frame
        effect.localTime = this.offset;

        // Reset offset for looping
        if (this.offset > 3000) {
            this.offset = 0;
        }
    }
});

if (typeof registerPaint !== 'undefined') {
    class WavePainter {
        static get inputProperties() {
            return ['--wave-offset', '--wave-color1', '--wave-color2'];
        }

        paint(ctx, geom, properties) {
            const width = geom.width;
            const height = geom.height;
            const offset = parseFloat(properties.get('--wave-offset')) || 0;

            // Get gradient colors
            const waveColor1 = properties.get('--wave-color1').toString().trim() || '#FFC2C2';
            const waveColor2 = properties.get('--wave-color2').toString().trim() || '#A2D2FF';

            // Create and fill gradient
            const gradient = ctx.createLinearGradient(0, 0, width, height * 1.5);
            gradient.addColorStop(0, waveColor1);
            gradient.addColorStop(1, waveColor2);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            //I have set the composite operation and fill style for the waves here
            ctx.globalCompositeOperation = 'destination-in';
            ctx.fillStyle = '#000';

            // I Drew the waves using sine and cosine for natural flow
            const amplitude = 120; 
            const frequency = 120; 

            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(0, height / 2 + i * 40);

                for (let x = 0; x < width; x++) {
                    const y = (
                        Math.sin((x + offset) / frequency) * amplitude * 0.8 +
                        Math.cos((x + offset) / (frequency * 1.3)) * amplitude * 0.3
                    ) + height / 2 + i * 40;

                    ctx.lineTo(x, y);
                }

                // Finish wave path
                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.closePath();
                ctx.fill();
            }
        }
    }

    registerPaint('wave', WavePainter);
}

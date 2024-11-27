// waves-worklet.js
if (typeof registerPaint !== 'undefined') {
    class WavePainter {
        static get inputProperties() {
            return [
                '--wave-offset'
            ];
        }

        paint(ctx, geom, properties) {
            const width = geom.width;
            const height = geom.height;
            const offset = parseFloat(properties.get('--wave-offset')) || 0;

            // Set gradient colors
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#FFC2C2'); // Light pink
            gradient.addColorStop(1, '#A2D2FF'); // Light blue

            // Fill the entire area with the gradient
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Draw waves
            ctx.globalCompositeOperation = 'destination-in';
            ctx.fillStyle = '#000';

            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                const frequency = 50;
                const amplitude = 20 + i * 10;

                ctx.moveTo(0, height / 2 + i * 30 + amplitude * Math.sin(offset / frequency));

                for (let x = 0; x < width; x++) {
                    const y = Math.sin((x + offset) / frequency) * amplitude + height / 2 + i * 30;
                    ctx.lineTo(x, y);
                }

                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.closePath();
                ctx.fill();
            }
        }
    }

    registerPaint('wave', WavePainter);
}

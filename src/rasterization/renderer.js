import { drawLine } from "./draw-line.js";

class RasterizationRenderer {
    constructor(canvas, scene) {
        this.canvas = canvas;
        this.scene = scene;
    }

    render() {
        this.canvas.clear(this.scene.background);

        for (const line of this.scene.objects) {
            drawLine(this.canvas, line.start, line.end, line.color);
        }

        this.canvas.present();
    }
}

export { RasterizationRenderer };

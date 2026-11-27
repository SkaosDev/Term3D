import { Line } from "../scene/line.js";
import { drawFilledTriangle } from "./draw-filled-triangle.js";
import { drawLine } from "./draw-line.js";
import { drawShadedTriangle } from "./draw-shaded-triangle.js";
import { drawWireframeTriangle } from "./draw-wireframe-triangle.js";

const drawTriangle = {
    wireframe: drawWireframeTriangle,
    filled: drawFilledTriangle,
    shaded: drawShadedTriangle
};

class RasterizationRenderer {
    constructor(canvas, scene) {
        this.canvas = canvas;
        this.scene = scene;
    }

    render() {
        this.canvas.clear(this.scene.background);

        for (const object of this.scene.objects) {
            if (object instanceof Line) {
                drawLine(this.canvas, object.start, object.end, object.color);
            } else {
                drawTriangle[object.style](this.canvas, object.p0, object.p1, object.p2, object.color);
            }
        }

        this.canvas.present();
    }
}

export { RasterizationRenderer };

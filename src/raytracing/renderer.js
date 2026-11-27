import { Color } from "../scene/color.js";
import { createRayGenerator } from "./ray-generator.js";
import { traceRay } from "./trace-ray.js";

const RECURSION_DEPTH = 3;
const SAMPLES_PER_AXIS = 2;

class RaytracingRenderer {
    constructor(canvas, camera, scene) {
        this.canvas = canvas;
        this.camera = camera;
        this.scene = scene;
    }

    render() {
        const { width, height } = this.canvas;
        const getRayDirection = createRayGenerator(this.camera, width);

        for (let y = -height / 2; y < height / 2; y++) {
            for (let x = -width / 2; x < width / 2; x++) {
                this.canvas.putPixel(x, y, this.samplePixel(x, y, getRayDirection));
            }
        }

        this.canvas.present();
    }

    samplePixel(x, y, getRayDirection) {
        let color = new Color(0, 0, 0);

        for (let sampleY = 0; sampleY < SAMPLES_PER_AXIS; sampleY++) {
            for (let sampleX = 0; sampleX < SAMPLES_PER_AXIS; sampleX++) {
                const canvasX = x + (sampleX + 0.5) / SAMPLES_PER_AXIS;
                const canvasY = y + (sampleY + 0.5) / SAMPLES_PER_AXIS;
                const direction = getRayDirection(canvasX, canvasY);
                color = color.add(traceRay(this.scene, this.camera.position, direction, 1, Infinity, RECURSION_DEPTH));
            }
        }

        return color.multiply(1 / (SAMPLES_PER_AXIS * SAMPLES_PER_AXIS));
    }
}

export { RaytracingRenderer };

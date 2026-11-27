import { Color } from "../scene/color.js";
import { createRayGenerator } from "./ray-generator.js";
import { traceRay } from "./trace-ray.js";

const RECURSION_DEPTH = 3;
const SAMPLES_PER_AXIS = 2;

class RaytracingRenderer {
    constructor(canvas, camera, scene) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.camera = camera;
        this.scene = scene;
        this.image = this.context.createImageData(canvas.width, canvas.height);
    }

    render() {
        const { width, height } = this.canvas;
        const getRayDirection = createRayGenerator(this.camera, width);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.setPixel(x, y, this.samplePixel(x, y, getRayDirection));
            }
        }

        this.context.putImageData(this.image, 0, 0);
    }

    samplePixel(x, y, getRayDirection) {
        const { width, height } = this.canvas;
        let color = new Color(0, 0, 0);

        for (let sampleY = 0; sampleY < SAMPLES_PER_AXIS; sampleY++) {
            for (let sampleX = 0; sampleX < SAMPLES_PER_AXIS; sampleX++) {
                const canvasX = x + (sampleX + 0.5) / SAMPLES_PER_AXIS - width / 2;
                const canvasY = height / 2 - y - (sampleY + 0.5) / SAMPLES_PER_AXIS;
                const direction = getRayDirection(canvasX, canvasY);
                color = color.add(traceRay(this.scene, this.camera.position, direction, 1, Infinity, RECURSION_DEPTH));
            }
        }

        return color.multiply(1 / (SAMPLES_PER_AXIS * SAMPLES_PER_AXIS));
    }

    setPixel(x, y, color) {
        const index = (y * this.canvas.width + x) * 4;
        this.image.data[index] = color.r;
        this.image.data[index + 1] = color.g;
        this.image.data[index + 2] = color.b;
        this.image.data[index + 3] = 255;
    }
}

export { RaytracingRenderer };

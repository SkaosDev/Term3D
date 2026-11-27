import { createRayGenerator } from "./ray-generator.js";
import { traceRay } from "./trace-ray.js";

const RECURSION_DEPTH = 3;

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
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        const getRayDirection = createRayGenerator(this.camera, width);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const canvasX = x + 0.5 - halfWidth;
                const canvasY = halfHeight - y - 0.5;
                const direction = getRayDirection(canvasX, canvasY);
                const color = traceRay(this.scene, this.camera.position, direction, 1, Infinity, RECURSION_DEPTH);
                this.setPixel(x, y, color);
            }
        }

        this.context.putImageData(this.image, 0, 0);
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

import { computeLighting } from "./lighting.js";

class Renderer {
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
        const getRayDirection = this.camera.createRayGenerator(width);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const canvasX = x + 0.5 - halfWidth;
                const canvasY = halfHeight - y - 0.5;
                const direction = getRayDirection(canvasX, canvasY);
                let closestDistance = Infinity;
                let closestObject = null;

                for (const object of this.scene.objects) {
                    const distance = object.intersect(this.camera.position, direction);
                    if (distance !== null && distance < closestDistance) {
                        closestDistance = distance;
                        closestObject = object;
                    }
                }

                let color = this.scene.background;
                if (closestObject !== null) {
                    const point = this.camera.position.add(direction.multiply(closestDistance));
                    const normal = point.subtract(closestObject.center).normalize();
                    const intensity = computeLighting(point, normal, this.scene.lights);
                    color = closestObject.color.multiply(intensity);
                }

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

export { Renderer };

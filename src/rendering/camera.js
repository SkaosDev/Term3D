import { Vector3 } from "../math/vector3.js";

class Camera {
    constructor(position, target, viewportWidth = 1, viewportDistance = 1) {
        this.position = position;
        this.target = target;
        this.viewportWidth = viewportWidth;
        this.viewportDistance = viewportDistance;
    }

    createRayGenerator(canvasWidth) {
        const forward = this.target.subtract(this.position).normalize();
        const right = new Vector3(0, 1, 0).cross(forward).normalize();
        const up = forward.cross(right).normalize();

        return (canvasX, canvasY) => {
            const viewportX = canvasX * this.viewportWidth / canvasWidth;
            const viewportY = canvasY * this.viewportWidth / canvasWidth;
            return new Vector3(
                right.x * viewportX + up.x * viewportY + forward.x * this.viewportDistance,
                right.y * viewportX + up.y * viewportY + forward.y * this.viewportDistance,
                right.z * viewportX + up.z * viewportY + forward.z * this.viewportDistance
            );
        };
    }
}

export { Camera };

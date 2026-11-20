import { Vector3 } from "../math/vector3.js";

function createRayGenerator(camera, canvasWidth) {
    const forward = camera.target.subtract(camera.position).normalize();
    const right = new Vector3(0, 1, 0).cross(forward).normalize();
    const up = forward.cross(right).normalize();

    return (canvasX, canvasY) => {
        const viewportX = canvasX * camera.viewportWidth / canvasWidth;
        const viewportY = canvasY * camera.viewportWidth / canvasWidth;
        return new Vector3(
            right.x * viewportX + up.x * viewportY + forward.x * camera.viewportDistance,
            right.y * viewportX + up.y * viewportY + forward.y * camera.viewportDistance,
            right.z * viewportX + up.z * viewportY + forward.z * camera.viewportDistance
        );
    };
}

export { createRayGenerator };

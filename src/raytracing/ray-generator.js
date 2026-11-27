import { Vector3 } from "../math/vector3.js";

function createRayGenerator(camera, canvasWidth) {
    const scale = camera.viewportWidth / canvasWidth;

    return (canvasX, canvasY) => camera.rotation.multiply(
        new Vector3(canvasX * scale, canvasY * scale, camera.viewportDistance)
    );
}

export { createRayGenerator };

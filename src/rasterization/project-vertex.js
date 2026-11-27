import { Point } from "../math/point.js";

function viewportToCanvas(x, y, camera, canvas) {
    const scale = canvas.width / camera.viewportWidth;
    return new Point(Math.round(x * scale), Math.round(y * scale));
}

function projectVertex(vertex, camera, canvas) {
    const d = camera.viewportDistance;
    return viewportToCanvas(vertex.x * d / vertex.z, vertex.y * d / vertex.z, camera, canvas);
}

export { projectVertex };

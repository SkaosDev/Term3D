import { drawWireframeTriangle } from "./draw-wireframe-triangle.js";
import { projectVertex } from "./project-vertex.js";

function renderInstance(canvas, instance, camera) {
    const transform = camera.transform.multiply(instance.transform);
    const projected = instance.model.vertices.map((vertex) => projectVertex(transform.transformPoint(vertex), camera, canvas));

    for (const { indices, color } of instance.model.triangles) {
        const [p0, p1, p2] = indices.map((index) => projected[index]);
        drawWireframeTriangle(canvas, p0, p1, p2, color);
    }
}

export { renderInstance };

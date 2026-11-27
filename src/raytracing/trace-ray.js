import { EPSILON, closestIntersection } from "./intersections.js";
import { computeLighting } from "./lighting.js";
import { surfaceNormal } from "./shapes.js";

function traceRay(scene, origin, direction, minDistance, maxDistance, depth) {
    const hit = closestIntersection(scene.objects, origin, direction, minDistance, maxDistance);
    if (hit === null) return scene.background;

    const { object, distance } = hit;
    const { material } = object;
    const point = origin.add(direction.multiply(distance));
    const normal = surfaceNormal(object, point);
    const view = direction.multiply(-1);
    const localColor = material.color.multiply(computeLighting(point, normal, view, material.specular, scene));

    if (depth <= 0 || material.reflective <= 0) return localColor;

    const reflectedColor = traceRay(scene, point, view.reflect(normal), EPSILON, Infinity, depth - 1);
    return localColor.multiply(1 - material.reflective).add(reflectedColor.multiply(material.reflective));
}

export { traceRay };

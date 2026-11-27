import { EPSILON, closestIntersection } from "./intersections.js";
import { computeLighting } from "./lighting.js";

function traceRay(scene, origin, direction, minDistance, maxDistance, depth) {
    const hit = closestIntersection(scene.objects, origin, direction, minDistance, maxDistance);
    if (hit === null) return scene.background;

    const { object, distance } = hit;
    const point = origin.add(direction.multiply(distance));
    const normal = point.subtract(object.center).normalize();
    const view = direction.multiply(-1);
    const localColor = object.color.multiply(computeLighting(point, normal, view, object.specular, scene));

    if (depth <= 0 || object.reflective <= 0) return localColor;

    const reflectedColor = traceRay(scene, point, view.reflect(normal), EPSILON, Infinity, depth - 1);
    return localColor.multiply(1 - object.reflective).add(reflectedColor.multiply(object.reflective));
}

export { traceRay };

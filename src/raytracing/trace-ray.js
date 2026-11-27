import { closestIntersection } from "./intersections.js";
import { computeLighting } from "./lighting.js";

function traceRay(scene, origin, direction, minDistance, maxDistance) {
    const hit = closestIntersection(scene.objects, origin, direction, minDistance, maxDistance);
    if (hit === null) return scene.background;

    const { object, distance } = hit;
    const point = origin.add(direction.multiply(distance));
    const normal = point.subtract(object.center).normalize();
    const view = direction.multiply(-1);
    return object.color.multiply(computeLighting(point, normal, view, object.specular, scene));
}

export { traceRay };

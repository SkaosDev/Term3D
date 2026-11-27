import { EPSILON, closestIntersection } from "./intersections.js";
import { computeLighting } from "./lighting.js";
import { surfaceNormal } from "./shapes.js";

function traceRay(scene, origin, direction, minDistance, maxDistance, depth) {
    const hit = closestIntersection(scene.objects, origin, direction, minDistance, maxDistance);
    if (hit === null) return scene.background;

    const { object, distance } = hit;
    const { material } = object;
    const point = origin.add(direction.multiply(distance));
    const outwardNormal = surfaceNormal(object, point);
    const isBackFace = outwardNormal.dot(direction) > 0;
    const normal = isBackFace ? outwardNormal.multiply(-1) : outwardNormal;
    const view = direction.multiply(-1);
    const localColor = material.color.multiply(computeLighting(point, normal, view, material.specular, scene));

    if (depth <= 0) return localColor;

    const reflection = view.reflect(normal);
    let color = localColor;

    if (material.reflective > 0) {
        const reflectedColor = traceRay(scene, point, reflection, EPSILON, Infinity, depth - 1);
        color = color.mix(reflectedColor, material.reflective);
    }

    if (material.transparency > 0) {
        const ratio = isBackFace ? material.refractiveIndex : 1 / material.refractiveIndex;
        const refraction = direction.refract(normal, ratio) ?? reflection;
        const refractedColor = traceRay(scene, point, refraction, EPSILON, Infinity, depth - 1);
        color = color.mix(refractedColor, material.transparency);
    }

    return color;
}

export { traceRay };

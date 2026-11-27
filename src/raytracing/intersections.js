import { intersect } from "./shapes.js";

const EPSILON = 0.001;

function closestIntersection(objects, origin, direction, minDistance, maxDistance) {
    let closest = null;

    for (const object of objects) {
        for (const distance of intersect(object, origin, direction)) {
            const inRange = distance >= minDistance && distance <= maxDistance;
            if (inRange && (closest === null || distance < closest.distance)) {
                closest = { object, distance };
            }
        }
    }

    return closest;
}

function hasIntersection(objects, origin, direction, minDistance, maxDistance) {
    return objects.some((object) => intersect(object, origin, direction)
        .some((distance) => distance >= minDistance && distance <= maxDistance));
}

export { EPSILON, closestIntersection, hasIntersection };

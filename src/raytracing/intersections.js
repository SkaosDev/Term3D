function intersectSphere(sphere, origin, direction) {
    const offset = origin.subtract(sphere.center);
    const a = direction.dot(direction);
    const b = 2 * offset.dot(direction);
    const c = offset.dot(offset) - sphere.radius * sphere.radius;
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) return [];

    const root = Math.sqrt(discriminant);
    return [(-b - root) / (2 * a), (-b + root) / (2 * a)];
}

function closestIntersection(objects, origin, direction, minDistance, maxDistance) {
    let closest = null;

    for (const object of objects) {
        for (const distance of intersectSphere(object, origin, direction)) {
            const inRange = distance >= minDistance && distance <= maxDistance;
            if (inRange && (closest === null || distance < closest.distance)) {
                closest = { object, distance };
            }
        }
    }

    return closest;
}

export { closestIntersection };

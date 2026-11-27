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

function sphereNormal(sphere, point) {
    return point.subtract(sphere.center).normalize();
}

function intersect(object, origin, direction) {
    return intersectSphere(object, origin, direction);
}

function surfaceNormal(object, point) {
    return sphereNormal(object, point);
}

export { intersect, surfaceNormal };

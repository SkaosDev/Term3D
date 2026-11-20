function intersectSphere(sphere, origin, direction) {
    const offset = origin.subtract(sphere.center);
    const a = direction.dot(direction);
    const b = 2 * offset.dot(direction);
    const c = offset.dot(offset) - sphere.radius * sphere.radius;
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) return null;

    const root = Math.sqrt(discriminant);
    const near = (-b - root) / (2 * a);
    const far = (-b + root) / (2 * a);

    if (near >= 0) return near;
    if (far >= 0) return far;
    return null;
}

export { intersectSphere };

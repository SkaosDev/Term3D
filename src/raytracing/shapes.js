import { Sphere } from "../scene/sphere.js";

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

function intersectTriangle(triangle, origin, direction) {
    const { a, b, c } = triangle;
    const normal = triangleNormal(triangle);
    const denominator = normal.dot(direction);

    if (denominator === 0) return [];

    const distance = normal.dot(a.subtract(origin)) / denominator;
    const point = origin.add(direction.multiply(distance));
    const edges = [[a, b], [b, c], [c, a]];
    const isInside = edges.every(([start, end]) => end.subtract(start).cross(point.subtract(start)).dot(normal) >= 0);

    return isInside ? [distance] : [];
}

function triangleNormal({ a, b, c }) {
    return b.subtract(a).cross(c.subtract(a)).normalize();
}

function intersect(object, origin, direction) {
    if (object instanceof Sphere) return intersectSphere(object, origin, direction);
    return intersectTriangle(object, origin, direction);
}

function surfaceNormal(object, point) {
    if (object instanceof Sphere) return sphereNormal(object, point);
    return triangleNormal(object);
}

export { intersect, surfaceNormal };

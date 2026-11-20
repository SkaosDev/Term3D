class Sphere {
    constructor(center, radius, color) {
        this.center = center;
        this.radius = radius;
        this.color = color;
    }

    intersect(origin, direction) {
        const offset = origin.subtract(this.center);
        const a = direction.dot(direction);
        const b = 2 * offset.dot(direction);
        const c = offset.dot(offset) - this.radius * this.radius;
        const discriminant = b * b - 4 * a * c;

        if (discriminant < 0) return null;

        const root = Math.sqrt(discriminant);
        const near = (-b - root) / (2 * a);
        const far = (-b + root) / (2 * a);

        if (near >= 0) return near;
        if (far >= 0) return far;
        return null;
    }
}

export { Sphere };

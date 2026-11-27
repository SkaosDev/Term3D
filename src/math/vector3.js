class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(other) {
        return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    subtract(other) {
        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    multiply(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    cross(other) {
        return new Vector3(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x
        );
    }

    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    reflect(normal) {
        return normal.multiply(2 * normal.dot(this)).subtract(this);
    }

    refract(normal, ratio) {
        const incident = this.normalize();
        const cosIncident = -normal.dot(incident);
        const sinSquaredRefracted = ratio * ratio * (1 - cosIncident * cosIncident);

        if (sinSquaredRefracted > 1) return null;

        const cosRefracted = Math.sqrt(1 - sinSquaredRefracted);
        return incident.multiply(ratio).add(normal.multiply(ratio * cosIncident - cosRefracted));
    }

    normalize() {
        const length = Math.sqrt(this.dot(this));
        return length === 0 ? new Vector3(0, 0, 0) : this.multiply(1 / length);
    }
}

export { Vector3 };

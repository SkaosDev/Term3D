class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    multiply(scalar) {
        return new Color(this.r * scalar, this.g * scalar, this.b * scalar);
    }

    add(other) {
        return new Color(this.r + other.r, this.g + other.g, this.b + other.b);
    }

    mix(other, amount) {
        return this.multiply(1 - amount).add(other.multiply(amount));
    }

    static add(a, b) {
        return new Color(a.r + b.r, a.g + b.g, a.b + b.b);
    }

    static multiply(color, scalar) {
        return new Color(color.r * scalar, color.g * scalar, color.b * scalar);
    }
}

export { Color };

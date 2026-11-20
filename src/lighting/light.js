class Light {
    constructor(type, intensity, vector = null) {
        this.type = type;
        this.intensity = intensity;
        this.vector = vector;
    }

    static ambient(intensity) {
        return new Light("ambient", intensity);
    }

    static point(intensity, position) {
        return new Light("point", intensity, position);
    }

    static directional(intensity, direction) {
        return new Light("directional", intensity, direction);
    }
}

export { Light };

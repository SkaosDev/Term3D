class Sphere {
    constructor(center, radius, color, specular = -1, reflective = 0) {
        this.center = center;
        this.radius = radius;
        this.color = color;
        this.specular = specular;
        this.reflective = reflective;
    }
}

export { Sphere };

class Material {
    constructor(color, specular = -1, reflective = 0) {
        this.color = color;
        this.specular = specular;
        this.reflective = reflective;
    }
}

export { Material };

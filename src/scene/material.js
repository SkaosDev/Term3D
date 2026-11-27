class Material {
    constructor(color, specular = -1, reflective = 0, transparency = 0, refractiveIndex = 1) {
        this.color = color;
        this.specular = specular;
        this.reflective = reflective;
        this.transparency = transparency;
        this.refractiveIndex = refractiveIndex;
    }
}

export { Material };

class Scene {
    constructor(background) {
        this.background = background;
        this.objects = [];
        this.lights = [];
    }

    add(object) {
        this.objects.push(object);
    }

    addLight(light) {
        this.lights.push(light);
    }
}

export { Scene };

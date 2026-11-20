class Scene {
    constructor(background) {
        this.background = background;
        this.objects = [];
    }

    add(object) {
        this.objects.push(object);
    }
}

export { Scene };

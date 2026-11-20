class Camera {
    constructor(position, target, viewportWidth = 1, viewportDistance = 1) {
        this.position = position;
        this.target = target;
        this.viewportWidth = viewportWidth;
        this.viewportDistance = viewportDistance;
    }
}

export { Camera };

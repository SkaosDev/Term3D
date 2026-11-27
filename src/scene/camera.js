import { Matrix3 } from "../math/matrix3.js";

class Camera {
    constructor(position, rotation = Matrix3.identity(), viewportWidth = 1, viewportDistance = 1) {
        this.position = position;
        this.rotation = rotation;
        this.viewportWidth = viewportWidth;
        this.viewportDistance = viewportDistance;
    }
}

export { Camera };

import { Matrix3 } from "../math/matrix3.js";
import { Matrix4 } from "../math/matrix4.js";

class Camera {
    constructor(position, rotation = Matrix3.identity(), viewportWidth = 1, viewportDistance = 1) {
        this.position = position;
        this.rotation = rotation;
        this.viewportWidth = viewportWidth;
        this.viewportDistance = viewportDistance;
    }

    get transform() {
        return Matrix4.rotation(this.rotation.transpose())
            .multiply(Matrix4.translation(this.position.multiply(-1)));
    }
}

export { Camera };

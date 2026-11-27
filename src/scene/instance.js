import { Matrix3 } from "../math/matrix3.js";
import { Matrix4 } from "../math/matrix4.js";

class Instance {
    constructor(model, position, rotation = Matrix3.identity(), scale = 1) {
        this.model = model;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }

    get transform() {
        return Matrix4.translation(this.position)
            .multiply(Matrix4.rotation(this.rotation))
            .multiply(Matrix4.scaling(this.scale));
    }
}

export { Instance };

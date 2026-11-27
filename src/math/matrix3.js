import { Vector3 } from "./vector3.js";

class Matrix3 {
    constructor(rows) {
        this.rows = rows;
    }

    multiply(vector) {
        const [x, y, z] = this.rows.map((row) => row[0] * vector.x + row[1] * vector.y + row[2] * vector.z);
        return new Vector3(x, y, z);
    }

    transpose() {
        return new Matrix3(this.rows.map((_, column) => this.rows.map((row) => row[column])));
    }

    static identity() {
        return new Matrix3([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    }

    static rotationY(degrees) {
        const angle = degrees * Math.PI / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Matrix3([[cos, 0, sin], [0, 1, 0], [-sin, 0, cos]]);
    }
}

export { Matrix3 };

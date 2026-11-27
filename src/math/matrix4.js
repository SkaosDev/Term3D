import { Vector3 } from "./vector3.js";

class Matrix4 {
    constructor(rows) {
        this.rows = rows;
    }

    multiply(other) {
        const rows = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    rows[i][j] += this.rows[i][k] * other.rows[k][j];
                }
            }
        }

        return new Matrix4(rows);
    }

    transformPoint(point) {
        const [x, y, z, w] = this.rows.map((row) => row[0] * point.x + row[1] * point.y + row[2] * point.z + row[3]);
        return new Vector3(x / w, y / w, z / w);
    }

    static translation({ x, y, z }) {
        return new Matrix4([[1, 0, 0, x], [0, 1, 0, y], [0, 0, 1, z], [0, 0, 0, 1]]);
    }

    static rotation(matrix) {
        const [a, b, c] = matrix.rows;
        return new Matrix4([[...a, 0], [...b, 0], [...c, 0], [0, 0, 0, 1]]);
    }

    static scaling(factor) {
        return new Matrix4([[factor, 0, 0, 0], [0, factor, 0, 0], [0, 0, factor, 0], [0, 0, 0, 1]]);
    }
}

export { Matrix4 };

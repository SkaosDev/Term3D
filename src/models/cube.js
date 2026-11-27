import { Vector3 } from "../math/vector3.js";
import { Color } from "../scene/color.js";
import { Model } from "../scene/model.js";
import { ModelTriangle } from "../scene/model-triangle.js";

const red = new Color(255, 0, 0);
const green = new Color(0, 255, 0);
const blue = new Color(0, 0, 255);
const yellow = new Color(255, 255, 0);
const purple = new Color(255, 0, 255);
const cyan = new Color(0, 255, 255);

const cube = new Model("Cube", [
    new Vector3(1, 1, 1),
    new Vector3(-1, 1, 1),
    new Vector3(-1, -1, 1),
    new Vector3(1, -1, 1),
    new Vector3(1, 1, -1),
    new Vector3(-1, 1, -1),
    new Vector3(-1, -1, -1),
    new Vector3(1, -1, -1)
], [
    new ModelTriangle(0, 1, 2, red),
    new ModelTriangle(0, 2, 3, red),
    new ModelTriangle(4, 0, 3, green),
    new ModelTriangle(4, 3, 7, green),
    new ModelTriangle(5, 4, 7, blue),
    new ModelTriangle(5, 7, 6, blue),
    new ModelTriangle(1, 5, 6, yellow),
    new ModelTriangle(1, 6, 2, yellow),
    new ModelTriangle(4, 5, 1, purple),
    new ModelTriangle(4, 1, 0, purple),
    new ModelTriangle(2, 6, 7, cyan),
    new ModelTriangle(2, 7, 3, cyan)
]);

export { cube };

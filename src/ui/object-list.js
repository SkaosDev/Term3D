import { CanvasTriangle } from "../scene/canvas-triangle.js";
import { Instance } from "../scene/instance.js";
import { Line } from "../scene/line.js";
import { Sphere } from "../scene/sphere.js";

const TRIANGLE_STYLES = {
    wireframe: "filaire",
    filled: "plein",
    shaded: "ombré"
};

function formatPoint({ x, y, z }) {
    return `(${x}, ${y}, ${z})`;
}

function formatCanvasPoint({ x, y }) {
    return `(${x}, ${y})`;
}

function describe(object, number) {
    if (object instanceof Instance) {
        return `${object.model.name} ${number} — position ${formatPoint(object.position)}, échelle ${object.scale}`;
    }
    if (object instanceof Line) {
        return `Ligne ${number} — de ${formatCanvasPoint(object.start)} à ${formatCanvasPoint(object.end)}`;
    }
    if (object instanceof CanvasTriangle) {
        const vertices = [object.p0, object.p1, object.p2].map(formatCanvasPoint).join(", ");
        return `Triangle ${TRIANGLE_STYLES[object.style]} ${number} — sommets ${vertices}`;
    }
    if (object instanceof Sphere) {
        return `Sphère ${number} — centre ${formatPoint(object.center)}, rayon ${object.radius}`;
    }
    return `Triangle ${number} — sommets ${formatPoint(object.a)}, ${formatPoint(object.b)}, ${formatPoint(object.c)}`;
}

function formatColor({ r, g, b }) {
    return `rgb(${r}, ${g}, ${b})`;
}

function swatchOf(object) {
    if (object instanceof Instance) {
        return `conic-gradient(${object.model.triangles.map(({ color }) => formatColor(color)).join(", ")})`;
    }
    return formatColor(object.material ? object.material.color : object.color);
}

function createObjectList(element, objects) {
    for (const [index, object] of objects.entries()) {
        const item = document.createElement("li");
        const swatch = document.createElement("span");
        const description = document.createElement("span");

        swatch.className = "swatch";
        swatch.style.background = swatchOf(object);
        description.textContent = describe(object, index + 1);
        item.append(swatch, description);
        element.append(item);
    }
}

export { createObjectList };

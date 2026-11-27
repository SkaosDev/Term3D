import { CanvasTriangle } from "../scene/canvas-triangle.js";
import { Line } from "../scene/line.js";
import { Sphere } from "../scene/sphere.js";

const TRIANGLE_STYLES = {
    wireframe: "filaire"
};

function formatPoint({ x, y, z }) {
    return `(${x}, ${y}, ${z})`;
}

function formatCanvasPoint({ x, y }) {
    return `(${x}, ${y})`;
}

function describe(object, number) {
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

function colorOf(object) {
    return object.material ? object.material.color : object.color;
}

function createObjectList(element, objects) {
    for (const [index, object] of objects.entries()) {
        const item = document.createElement("li");
        const swatch = document.createElement("span");
        const description = document.createElement("span");
        const { r, g, b } = colorOf(object);

        swatch.className = "swatch";
        swatch.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        description.textContent = describe(object, index + 1);
        item.append(swatch, description);
        element.append(item);
    }
}

export { createObjectList };

import { Sphere } from "../scene/sphere.js";

function formatPoint({ x, y, z }) {
    return `(${x}, ${y}, ${z})`;
}

function describe(object, number) {
    if (object instanceof Sphere) {
        return `Sphère ${number} — centre ${formatPoint(object.center)}, rayon ${object.radius}`;
    }
    return `Triangle ${number} — sommets ${formatPoint(object.a)}, ${formatPoint(object.b)}, ${formatPoint(object.c)}`;
}

function createObjectList(element, objects) {
    for (const [index, object] of objects.entries()) {
        const item = document.createElement("li");
        const swatch = document.createElement("span");
        const description = document.createElement("span");
        const { r, g, b } = object.material.color;

        swatch.className = "swatch";
        swatch.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        description.textContent = describe(object, index + 1);
        item.append(swatch, description);
        element.append(item);
    }
}

export { createObjectList };

function createObjectList(element, objects) {
    for (const [index, object] of objects.entries()) {
        const item = document.createElement("li");
        const swatch = document.createElement("span");
        const description = document.createElement("span");
        const { x, y, z } = object.center;

        swatch.className = "swatch";
        swatch.style.backgroundColor = `rgb(${object.color.r}, ${object.color.g}, ${object.color.b})`;
        description.textContent = `Sphère ${index + 1} — centre (${x}, ${y}, ${z}), rayon ${object.radius}`;
        item.append(swatch, description);
        element.append(item);
    }
}

export { createObjectList };

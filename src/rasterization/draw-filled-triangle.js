import { interpolate } from "./interpolate.js";

function drawFilledTriangle(canvas, p0, p1, p2, color) {
    [p0, p1, p2] = [p0, p1, p2].sort((a, b) => a.y - b.y);

    const x01 = interpolate(p0.y, p0.x, p1.y, p1.x);
    const x12 = interpolate(p1.y, p1.x, p2.y, p2.x);
    const x02 = interpolate(p0.y, p0.x, p2.y, p2.x);
    const x012 = [...x01.slice(0, -1), ...x12];

    const middle = Math.floor(x012.length / 2);
    const [xLeft, xRight] = x02[middle] < x012[middle] ? [x02, x012] : [x012, x02];

    for (let y = p0.y; y <= p2.y; y++) {
        const left = Math.round(xLeft[y - p0.y]);
        const right = Math.round(xRight[y - p0.y]);

        for (let x = left; x <= right; x++) {
            canvas.putPixel(x, y, color);
        }
    }
}

export { drawFilledTriangle };

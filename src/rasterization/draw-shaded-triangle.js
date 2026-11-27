import { interpolate } from "./interpolate.js";
import { triangleEdges } from "./triangle-edges.js";

function drawShadedTriangle(canvas, p0, p1, p2, color) {
    [p0, p1, p2] = [p0, p1, p2].sort((a, b) => a.y - b.y);

    const [x02, x012] = triangleEdges(p0, p1, p2, "x");
    const [h02, h012] = triangleEdges(p0, p1, p2, "h");

    const middle = Math.floor(x012.length / 2);
    const [xLeft, hLeft, xRight, hRight] = x02[middle] < x012[middle]
        ? [x02, h02, x012, h012]
        : [x012, h012, x02, h02];

    for (let y = p0.y; y <= p2.y; y++) {
        const left = Math.round(xLeft[y - p0.y]);
        const right = Math.round(xRight[y - p0.y]);
        const hSegment = interpolate(left, hLeft[y - p0.y], right, hRight[y - p0.y]);

        for (let x = left; x <= right; x++) {
            canvas.putPixel(x, y, color.multiply(hSegment[x - left]));
        }
    }
}

export { drawShadedTriangle };

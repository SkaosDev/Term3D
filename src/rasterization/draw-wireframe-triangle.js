import { drawLine } from "./draw-line.js";

function drawWireframeTriangle(canvas, p0, p1, p2, color) {
    drawLine(canvas, p0, p1, color);
    drawLine(canvas, p1, p2, color);
    drawLine(canvas, p2, p0, color);
}

export { drawWireframeTriangle };

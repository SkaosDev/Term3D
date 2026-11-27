import { interpolate } from "./interpolate.js";

function drawLine(canvas, start, end, color) {
    if (Math.abs(end.x - start.x) > Math.abs(end.y - start.y)) {
        if (start.x > end.x) [start, end] = [end, start];

        const ys = interpolate(start.x, start.y, end.x, end.y);
        for (let x = start.x; x <= end.x; x++) {
            canvas.putPixel(x, ys[x - start.x], color);
        }
    } else {
        if (start.y > end.y) [start, end] = [end, start];

        const xs = interpolate(start.y, start.x, end.y, end.x);
        for (let y = start.y; y <= end.y; y++) {
            canvas.putPixel(xs[y - start.y], y, color);
        }
    }
}

export { drawLine };

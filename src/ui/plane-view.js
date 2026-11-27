import { Point } from "../math/point.js";

const FRAME_COLOR = "#6b7280";
const X_AXIS_COLOR = "#ff5555";
const Y_AXIS_COLOR = "#55ff55";

function strokeSegment(context, [x0, y0], [x1, y1], color) {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
}

function fillDot(context, [x, y], radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
}

function fillLabel(context, text, [x, y], color) {
    context.fillStyle = color;
    context.fillText(text, x, y);
}

function createPlaneView(container, scene, width, height) {
    const element = document.createElement("canvas");
    const context = element.getContext("2d");
    container.append(element);

    const draw = () => {
        const ratio = window.devicePixelRatio;
        element.width = container.clientWidth * ratio;
        element.height = container.clientHeight * ratio;

        const scale = 0.8 * Math.min(element.width / width, element.height / height);
        const toScreen = ({ x, y }) => [element.width / 2 + x * scale, element.height / 2 - y * scale];
        const [left, top] = toScreen(new Point(-width / 2, height / 2));
        const [right, bottom] = toScreen(new Point(width / 2, -height / 2));
        const [originX, originY] = toScreen(new Point(0, 0));
        const gap = 12 * ratio;

        context.lineWidth = ratio;
        context.font = `bold ${14 * ratio}px sans-serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";

        context.strokeStyle = FRAME_COLOR;
        context.strokeRect(left, top, right - left, bottom - top);
        strokeSegment(context, [left, originY], [right, originY], X_AXIS_COLOR);
        strokeSegment(context, [originX, bottom], [originX, top], Y_AXIS_COLOR);
        fillLabel(context, "X", [right + gap, originY], X_AXIS_COLOR);
        fillLabel(context, "Y", [originX, top - gap], Y_AXIS_COLOR);

        for (const line of scene.objects) {
            const { r, g, b } = line.color;
            const color = `rgb(${r}, ${g}, ${b})`;
            strokeSegment(context, toScreen(line.start), toScreen(line.end), color);
            fillDot(context, toScreen(line.start), 3 * ratio, color);
            fillDot(context, toScreen(line.end), 3 * ratio, color);
        }
    };

    new ResizeObserver(draw).observe(container);
}

export { createPlaneView };

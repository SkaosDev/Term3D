import { Canvas } from "../canvas/canvas.js";
import { Point } from "../math/point.js";
import { RasterizationRenderer } from "../rasterization/renderer.js";
import { CanvasTriangle } from "../scene/canvas-triangle.js";
import { Color } from "../scene/color.js";
import { Line } from "../scene/line.js";
import { Scene } from "../scene/scene.js";
import { createObjectList } from "../ui/object-list.js";
import { createPlaneView } from "../ui/plane-view.js";

function renderRasterizationPage(page) {
    const canvas = new Canvas(page.querySelector(".screen"));
    const scene = new Scene(new Color(20, 24, 34));
    const white = new Color(255, 255, 255);
    const green = new Color(0, 255, 0);

    scene.add(new Line(new Point(-620, -100), new Point(-260, 120), white));
    scene.add(new Line(new Point(-470, -200), new Point(-360, 240), new Color(255, 160, 0)));
    scene.add(new CanvasTriangle(new Point(-200, -250), new Point(200, 50), new Point(20, 250), green, "filled"));
    scene.add(new CanvasTriangle(new Point(-200, -250), new Point(200, 50), new Point(20, 250), white, "wireframe"));
    scene.add(new CanvasTriangle(new Point(220, -250, 0.3), new Point(620, 50, 0.1), new Point(440, 250, 1), green, "shaded"));

    new RasterizationRenderer(canvas, scene).render();
    createPlaneView(page.querySelector(".view"), scene, canvas.width, canvas.height);
    createObjectList(page.querySelector(".object-list"), scene.objects);
}

export { renderRasterizationPage };

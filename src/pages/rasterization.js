import { Canvas } from "../canvas/canvas.js";
import { Point } from "../math/point.js";
import { RasterizationRenderer } from "../rasterization/renderer.js";
import { Color } from "../scene/color.js";
import { Line } from "../scene/line.js";
import { Scene } from "../scene/scene.js";
import { createObjectList } from "../ui/object-list.js";

function renderRasterizationPage(page) {
    const canvas = new Canvas(page.querySelector(".screen"));
    const scene = new Scene(new Color(20, 24, 34));

    scene.add(new Line(new Point(-200, -100), new Point(240, 120), new Color(255, 255, 255)));
    scene.add(new Line(new Point(-50, -200), new Point(60, 240), new Color(255, 160, 0)));

    new RasterizationRenderer(canvas, scene).render();
    createObjectList(page.querySelector(".object-list"), scene.objects);
}

export { renderRasterizationPage };

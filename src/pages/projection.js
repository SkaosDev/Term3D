import { Canvas } from "../canvas/canvas.js";
import { Vector3 } from "../math/vector3.js";
import { projectVertex } from "../rasterization/project-vertex.js";
import { RasterizationRenderer } from "../rasterization/renderer.js";
import { Camera } from "../scene/camera.js";
import { Color } from "../scene/color.js";
import { Line } from "../scene/line.js";
import { Scene } from "../scene/scene.js";
import { createObjectList } from "../ui/object-list.js";
import { createPlaneView } from "../ui/plane-view.js";

function renderProjectionPage(page) {
    const canvas = new Canvas(page.querySelector(".screen"));
    const camera = new Camera(new Vector3(0, 0, 0));
    const scene = new Scene(new Color(20, 24, 34));
    const project = (vertex) => projectVertex(vertex, camera, canvas);

    const blue = new Color(0, 0, 255);
    const red = new Color(255, 0, 0);
    const green = new Color(0, 255, 0);

    const vAf = new Vector3(-2, -0.5, 5);
    const vBf = new Vector3(-2, 0.5, 5);
    const vCf = new Vector3(-1, 0.5, 5);
    const vDf = new Vector3(-1, -0.5, 5);

    const vAb = new Vector3(-2, -0.5, 6);
    const vBb = new Vector3(-2, 0.5, 6);
    const vCb = new Vector3(-1, 0.5, 6);
    const vDb = new Vector3(-1, -0.5, 6);

    scene.add(new Line(project(vAf), project(vBf), blue));
    scene.add(new Line(project(vBf), project(vCf), blue));
    scene.add(new Line(project(vCf), project(vDf), blue));
    scene.add(new Line(project(vDf), project(vAf), blue));

    scene.add(new Line(project(vAb), project(vBb), red));
    scene.add(new Line(project(vBb), project(vCb), red));
    scene.add(new Line(project(vCb), project(vDb), red));
    scene.add(new Line(project(vDb), project(vAb), red));

    scene.add(new Line(project(vAf), project(vAb), green));
    scene.add(new Line(project(vBf), project(vBb), green));
    scene.add(new Line(project(vCf), project(vCb), green));
    scene.add(new Line(project(vDf), project(vDb), green));

    new RasterizationRenderer(canvas, scene).render();
    createPlaneView(page.querySelector(".view"), scene, canvas.width, canvas.height);
    createObjectList(page.querySelector(".object-list"), scene.objects);
}

export { renderProjectionPage };

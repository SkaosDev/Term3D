import { Canvas } from "../canvas/canvas.js";
import { Matrix3 } from "../math/matrix3.js";
import { Vector3 } from "../math/vector3.js";
import { cube } from "../models/cube.js";
import { RasterizationRenderer } from "../rasterization/renderer.js";
import { Camera } from "../scene/camera.js";
import { Color } from "../scene/color.js";
import { Instance } from "../scene/instance.js";
import { Scene } from "../scene/scene.js";
import { createObjectList } from "../ui/object-list.js";
import { createSceneView } from "../ui/scene-view.js";

function renderInstancesPage(page) {
    const canvas = new Canvas(page.querySelector(".screen"));
    const camera = new Camera(new Vector3(-3, 1, 2), Matrix3.rotationY(30), canvas.width / canvas.height);
    const scene = new Scene(new Color(20, 24, 34));

    scene.add(new Instance(cube, new Vector3(-1.5, 0, 7), Matrix3.identity(), 0.75));
    scene.add(new Instance(cube, new Vector3(1.25, 2.5, 7.5), Matrix3.rotationY(-195)));

    new RasterizationRenderer(canvas, scene, camera).render();
    createSceneView(page.querySelector(".view"), scene, camera, canvas.width, canvas.height);
    createObjectList(page.querySelector(".object-list"), scene.objects);
}

export { renderInstancesPage };

import { Color } from "./scene/color.js";
import { Camera } from "./rendering/camera.js";
import { Light } from "./lighting/light.js";
import { createObjectList } from "./rendering/object-list.js";
import { Renderer } from "./rendering/renderer.js";
import { createSceneView } from "./rendering/scene-view.js";
import { Scene } from "./scene/scene.js";
import { Sphere } from "./scene/sphere.js";
import { Vector3 } from "./math/vector3.js";

const canvas = document.getElementById("ecran");
const camera = new Camera(
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 1)
);
const scene = new Scene(new Color(20, 24, 34));

scene.add(new Sphere(new Vector3(0, -1, 3), 1, new Color(255, 0, 0), 500));
scene.add(new Sphere(new Vector3(-2, 0, 4), 1, new Color(0, 255, 0), 10));
scene.add(new Sphere(new Vector3(2, 0, 4), 1, new Color(0, 0, 255), 500));
scene.add(new Sphere(new Vector3(0, -5001, 0), 5000, new Color(255, 255, 0), 1000));

scene.addLight(Light.ambient(0.2));
scene.addLight(Light.point(0.6, new Vector3(2, 1, 0)));
scene.addLight(Light.directional(0.2, new Vector3(1, 4, 4)));

const renderer = new Renderer(canvas, camera, scene);
renderer.render();
createSceneView(document.getElementById("scene"), scene, camera, canvas.width, canvas.height);
createObjectList(document.getElementById("objets"), scene.objects);

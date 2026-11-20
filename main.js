import { Color } from "./lib/color.js";
import { Camera } from "./lib/camera.js";
import { Renderer } from "./lib/renderer.js";
import { Scene } from "./lib/scene.js";
import { Sphere } from "./lib/sphere.js";
import { Vector3 } from "./lib/vector3.js";

const canvas = document.getElementById("ecran");
const camera = new Camera(
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 1)
);
const scene = new Scene(new Color(20, 24, 34));

scene.add(new Sphere(new Vector3(0, -1, 3), 1, new Color(220, 55, 55)));
scene.add(new Sphere(new Vector3(-2, 0, 4), 1, new Color(55, 180, 90)));
scene.add(new Sphere(new Vector3(2, 0, 4), 1, new Color(65, 110, 220)));

const renderer = new Renderer(canvas, camera, scene);
renderer.render();

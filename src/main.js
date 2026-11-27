import { Color } from "./scene/color.js";
import { Camera } from "./scene/camera.js";
import { Light } from "./lighting/light.js";
import { Material } from "./scene/material.js";
import { RaytracingRenderer } from "./raytracing/renderer.js";
import { createObjectList } from "./ui/object-list.js";
import { createSceneView } from "./ui/scene-view.js";
import { Scene } from "./scene/scene.js";
import { Sphere } from "./scene/sphere.js";
import { Matrix3 } from "./math/matrix3.js";
import { Vector3 } from "./math/vector3.js";

const canvas = document.getElementById("ecran");
const camera = new Camera(new Vector3(3, 0, 1), Matrix3.rotationY(-45));
const scene = new Scene(new Color(20, 24, 34));

const red = new Material(new Color(255, 0, 0), 500, 0.2);
const green = new Material(new Color(0, 255, 0), 10, 0.4);
const blue = new Material(new Color(0, 0, 255), 500, 0.3);
const yellow = new Material(new Color(255, 255, 0), 1000, 0.5);

scene.add(new Sphere(new Vector3(0, -1, 3), 1, red));
scene.add(new Sphere(new Vector3(-2, 0, 4), 1, green));
scene.add(new Sphere(new Vector3(2, 0, 4), 1, blue));
scene.add(new Sphere(new Vector3(0, -5001, 0), 5000, yellow));

scene.addLight(Light.ambient(0.2));
scene.addLight(Light.point(0.6, new Vector3(2, 1, 0)));
scene.addLight(Light.directional(0.2, new Vector3(1, 4, 4)));

const renderer = new RaytracingRenderer(canvas, camera, scene);
renderer.render();
createSceneView(document.getElementById("scene"), scene, camera, canvas.width, canvas.height);
createObjectList(document.getElementById("objets"), scene.objects);

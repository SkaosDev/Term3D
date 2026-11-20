import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

function createSceneView(container, scene, camera) {
    const view = new THREE.Scene();
    view.background = new THREE.Color(0x111827);

    const cameraView = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
    cameraView.position.set(camera.position.x + 7, camera.position.y + 5, camera.position.z + 9);
    cameraView.lookAt(camera.position.x, camera.position.y, camera.position.z);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.append(renderer.domElement);

    const grid = new THREE.GridHelper(12, 12, 0x64748b, 0x334155);
    grid.position.set(camera.position.x, camera.position.y, camera.position.z);
    view.add(grid);
    const axes = new THREE.AxesHelper(2);
    axes.position.set(camera.position.x, camera.position.y, camera.position.z);
    view.add(axes);
    view.add(new THREE.AmbientLight(0xffffff, 1.5));

    const cameraMarker = new THREE.PerspectiveCamera(45, 1, 0.1, 8);
    cameraMarker.position.set(camera.position.x, camera.position.y, camera.position.z);
    cameraMarker.lookAt(camera.target.x, camera.target.y, camera.target.z);
    view.add(new THREE.CameraHelper(cameraMarker));

    for (const object of scene.objects) {
        const color = new THREE.Color(object.color.r / 255, object.color.g / 255, object.color.b / 255);
        const material = new THREE.MeshStandardMaterial({ color, roughness: 0.65 });

        if (object.radius > 10) {
            const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), material);
            ground.rotation.x = -Math.PI / 2;
            ground.position.y = object.center.y + object.radius;
            view.add(ground);
        } else {
            const sphere = new THREE.Mesh(new THREE.SphereGeometry(object.radius, 24, 16), material);
            sphere.position.set(object.center.x, object.center.y, object.center.z);
            view.add(sphere);
        }
    }

    for (const light of scene.lights) {
        if (light.type === "point") {
            const pointLight = new THREE.PointLight(0xfff0b0, light.intensity * 4);
            pointLight.position.set(light.vector.x, light.vector.y, light.vector.z);
            view.add(pointLight, new THREE.PointLightHelper(pointLight, 0.16));
        } else if (light.type === "directional") {
            const direction = new THREE.Vector3(light.vector.x, light.vector.y, light.vector.z).normalize();
            const directionalLight = new THREE.DirectionalLight(0xffffff, light.intensity * 4);
            directionalLight.position.copy(direction.multiplyScalar(5));
            view.add(directionalLight, new THREE.DirectionalLightHelper(directionalLight, 0.35));
        }
    }

    const resize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        cameraView.aspect = width / height;
        cameraView.updateProjectionMatrix();
        renderer.render(view, cameraView);
    };

    new ResizeObserver(resize).observe(container);
}

export { createSceneView };

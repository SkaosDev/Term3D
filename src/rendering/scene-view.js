import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

function createSceneView(container, scene, camera) {
    const view = new THREE.Scene();
    view.background = new THREE.Color(0x111827);

    const cameraView = new THREE.OrthographicCamera(-6, 6, 3.5, -3.5, 0.1, 100);
    cameraView.position.set(camera.position.x + 8, camera.position.y + 8, camera.position.z + 8);
    cameraView.lookAt(camera.position.x, camera.position.y, camera.position.z);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.append(renderer.domElement);

    const axes = new THREE.AxesHelper(3);
    axes.position.set(camera.position.x, camera.position.y, camera.position.z);
    view.add(axes);
    view.add(new THREE.AmbientLight(0xffffff, 1.5));

    const cameraMarker = new THREE.PerspectiveCamera(45, 1, 0.1, 8);
    cameraMarker.position.set(camera.position.x, camera.position.y, camera.position.z);
    cameraMarker.lookAt(camera.target.x, camera.target.y, camera.target.z);
    view.add(new THREE.CameraHelper(cameraMarker));

    for (const object of scene.objects) {
        if (object.radius > 10) continue;
        const color = new THREE.Color(object.color.r / 255, object.color.g / 255, object.color.b / 255);
        const material = new THREE.MeshStandardMaterial({ color, roughness: 0.65 });
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(object.radius, 24, 16), material);
        sphere.position.set(object.center.x, object.center.y, object.center.z);
        view.add(sphere);
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
        const viewHeight = 8;
        cameraView.left = -viewHeight * (width / height) / 2;
        cameraView.right = viewHeight * (width / height) / 2;
        cameraView.top = viewHeight / 2;
        cameraView.bottom = -viewHeight / 2;
        renderer.setSize(width, height, false);
        cameraView.aspect = width / height;
        cameraView.updateProjectionMatrix();
        renderer.render(view, cameraView);
    };

    new ResizeObserver(resize).observe(container);
}

export { createSceneView };

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

function addAxisLabel(scene, label, color, position) {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext("2d");
    context.fillStyle = color;
    context.font = "bold 48px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(label, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    const labelSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false }));
    labelSprite.position.copy(position);
    labelSprite.scale.set(0.45, 0.45, 1);
    scene.add(labelSprite);
}

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
    const origin = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
    addAxisLabel(view, "X", "#ff5555", origin.clone().add(new THREE.Vector3(3.35, 0, 0)));
    addAxisLabel(view, "Y", "#55ff55", origin.clone().add(new THREE.Vector3(0, 3.35, 0)));
    addAxisLabel(view, "Z", "#5599ff", origin.clone().add(new THREE.Vector3(0, 0, 3.35)));
    view.add(new THREE.AmbientLight(0xffffff, 1.5));

    const viewDirection = new THREE.Vector3(
        camera.target.x - camera.position.x,
        camera.target.y - camera.position.y,
        camera.target.z - camera.position.z
    ).normalize();
    view.add(new THREE.ArrowHelper(viewDirection, origin, 1.5, 0xffffff, 0.25, 0.15));
    const cameraMarker = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    cameraMarker.position.copy(origin);
    view.add(cameraMarker);

    for (const object of scene.objects) {
        const color = new THREE.Color(object.color.r / 255, object.color.g / 255, object.color.b / 255);
        const material = new THREE.MeshStandardMaterial({ color, roughness: 0.65 });
        const displayedRadius = Math.min(object.radius, 0.8);
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(displayedRadius, 24, 16), material);
        sphere.position.set(object.center.x, object.center.y, object.center.z);
        if (object.radius > displayedRadius) {
            const directionToCamera = origin.clone().sub(sphere.position).normalize();
            sphere.position.addScaledVector(directionToCamera, object.radius - displayedRadius);
        }
        view.add(sphere);
    }

    for (const light of scene.lights) {
        if (light.type === "point") {
            const pointLight = new THREE.PointLight(0xfff0b0, light.intensity * 4);
            pointLight.position.set(light.vector.x, light.vector.y, light.vector.z);
            const marker = new THREE.Mesh(
                new THREE.SphereGeometry(0.12, 12, 8),
                new THREE.MeshBasicMaterial({ color: 0xffd43b })
            );
            marker.position.copy(pointLight.position);
            view.add(pointLight, marker);
        } else if (light.type === "directional") {
            const direction = new THREE.Vector3(light.vector.x, light.vector.y, light.vector.z).normalize();
            const directionalLight = new THREE.DirectionalLight(0xffffff, light.intensity * 4);
            directionalLight.position.copy(direction).multiplyScalar(5);
            view.add(directionalLight);
            view.add(new THREE.ArrowHelper(
                direction,
                origin.clone().add(direction.clone().multiplyScalar(-2)),
                1.2,
                0xffd43b,
                0.2,
                0.12
            ));
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

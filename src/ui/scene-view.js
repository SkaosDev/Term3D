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
    labelSprite.renderOrder = 10;
    scene.add(labelSprite);
}

function createSceneView(container, scene, camera, renderWidth, renderHeight) {
    const view = new THREE.Scene();
    view.background = new THREE.Color(0x111827);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.append(renderer.domElement);

    const origin = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
    const viewHeight = camera.viewportWidth * 6;
    const cameraView = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 20000);
    cameraView.position.copy(origin).add(
        new THREE.Vector3(1, 1, 1).normalize().multiplyScalar(viewHeight)
    );
    cameraView.lookAt(origin);

    const axes = new THREE.AxesHelper(3);
    axes.position.set(camera.position.x, camera.position.y, camera.position.z);
    axes.traverse((part) => {
        if (part.material) part.material.depthTest = false;
        part.renderOrder = 10;
    });
    view.add(axes);
    addAxisLabel(view, "X", "#ff5555", origin.clone().add(new THREE.Vector3(3.35, 0, 0)));
    addAxisLabel(view, "Y", "#55ff55", origin.clone().add(new THREE.Vector3(0, 3.35, 0)));
    addAxisLabel(view, "Z", "#5599ff", origin.clone().add(new THREE.Vector3(0, 0, 3.35)));
    view.add(new THREE.AmbientLight(0xffffff, 1.5));

    const viewDirection = new THREE.Vector3(
        camera.target.x - camera.position.x,
        camera.target.y - camera.position.y,
        camera.target.z - camera.position.z
    ).normalize();
    const directionArrow = new THREE.ArrowHelper(viewDirection, origin, 1.5, 0xffffff, 0.25, 0.15);
    directionArrow.traverse((part) => {
        if (part.material) part.material.depthTest = false;
        part.renderOrder = 10;
    });
    view.add(directionArrow);
    const viewportWidth = camera.viewportWidth;
    const worldUp = new THREE.Vector3(0, 1, 0);
    const screenRight = worldUp.clone().cross(viewDirection).normalize();
    const screenUp = viewDirection.clone().cross(screenRight).normalize();
    const viewportHeight = viewportWidth * renderHeight / renderWidth;
    const viewportCenter = origin.clone().addScaledVector(viewDirection, camera.viewportDistance);
    const corners = [
        viewportCenter.clone().addScaledVector(screenRight, -viewportWidth / 2).addScaledVector(screenUp, -viewportHeight / 2),
        viewportCenter.clone().addScaledVector(screenRight, viewportWidth / 2).addScaledVector(screenUp, -viewportHeight / 2),
        viewportCenter.clone().addScaledVector(screenRight, viewportWidth / 2).addScaledVector(screenUp, viewportHeight / 2),
        viewportCenter.clone().addScaledVector(screenRight, -viewportWidth / 2).addScaledVector(screenUp, viewportHeight / 2)
    ];
    const framePoints = [];
    for (let index = 0; index < corners.length; index++) {
        framePoints.push(...origin.toArray(), ...corners[index].toArray());
        framePoints.push(...corners[index].toArray(), ...corners[(index + 1) % corners.length].toArray());
    }
    const frameGeometry = new THREE.BufferGeometry();
    frameGeometry.setAttribute("position", new THREE.Float32BufferAttribute(framePoints, 3));
    const viewportFrame = new THREE.LineSegments(
        frameGeometry,
        new THREE.LineBasicMaterial({ color: 0xffffff, depthTest: false })
    );
    viewportFrame.renderOrder = 10;
    view.add(viewportFrame);

    for (const object of scene.objects) {
        const color = new THREE.Color(object.color.r / 255, object.color.g / 255, object.color.b / 255);
        const isLarge = object.radius > viewHeight;
        const material = isLarge
            ? new THREE.MeshBasicMaterial({
                color,
                wireframe: true,
                transparent: true,
                opacity: 0.18,
                depthWrite: false
            })
            : new THREE.MeshStandardMaterial({ color, roughness: 0.65, depthTest: false });
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(object.radius, 24, 16), material);
        sphere.position.set(object.center.x, object.center.y, object.center.z);
        if (isLarge) sphere.renderOrder = -1;
        view.add(sphere);
    }

    for (const light of scene.lights) {
        if (light.type === "point") {
            const pointLight = new THREE.PointLight(0xfff0b0, light.intensity * 4);
            pointLight.position.set(light.vector.x, light.vector.y, light.vector.z);
            const marker = new THREE.Mesh(
                new THREE.OctahedronGeometry(0.16),
                new THREE.MeshBasicMaterial({ color: 0xffd43b, depthTest: false })
            );
            marker.position.copy(pointLight.position);
            marker.renderOrder = 11;
            view.add(pointLight, marker);
        } else if (light.type === "directional") {
            const direction = new THREE.Vector3(light.vector.x, light.vector.y, light.vector.z).normalize();
            const directionalLight = new THREE.DirectionalLight(0xffffff, light.intensity * 4);
            directionalLight.position.copy(direction).multiplyScalar(5);
            view.add(directionalLight);
            const lightArrow = new THREE.ArrowHelper(
                direction,
                origin.clone().add(direction.clone().multiplyScalar(-2)),
                1.2,
                0xffd43b,
                0.2,
                0.12
            );
            lightArrow.traverse((part) => {
                if (part.material) part.material.depthTest = false;
                part.renderOrder = 11;
            });
            view.add(lightArrow);
        }
    }

    const resize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (!width || !height) return;
        const aspect = width / height;
        const halfHeight = viewHeight / 2;
        cameraView.left = -halfHeight * aspect;
        cameraView.right = halfHeight * aspect;
        cameraView.top = halfHeight;
        cameraView.bottom = -halfHeight;
        renderer.setSize(width, height, false);
        cameraView.updateProjectionMatrix();
        renderer.render(view, cameraView);
    };

    new ResizeObserver(resize).observe(container);
}

export { createSceneView };

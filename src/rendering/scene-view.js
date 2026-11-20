function createSceneView(canvas, scene, camera) {
    const context = canvas.getContext("2d");
    const project = (point) => ({
        x: canvas.width / 2 + point.x * 50 - point.z * 38,
        y: canvas.height / 2 + point.x * 16 + point.z * 25 - point.y * 45
    });

    context.fillStyle = "#111827";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const floor = [
        project({ x: -3, y: -1, z: 0 }),
        project({ x: 3, y: -1, z: 0 }),
        project({ x: 3, y: -1, z: 6 }),
        project({ x: -3, y: -1, z: 6 })
    ];
    context.beginPath();
    context.moveTo(floor[0].x, floor[0].y);
    for (const point of floor.slice(1)) context.lineTo(point.x, point.y);
    context.closePath();
    context.fillStyle = "#1f2937";
    context.fill();
    context.strokeStyle = "#4b5563";
    context.stroke();

    const origin = project(camera.position);
    const target = project(camera.target);
    context.strokeStyle = "#d1d5db";
    context.beginPath();
    context.moveTo(origin.x, origin.y);
    context.lineTo(target.x - 25, target.y);
    context.lineTo(target.x, target.y - 16);
    context.lineTo(target.x + 25, target.y);
    context.closePath();
    context.stroke();

    context.strokeStyle = "#9ca3af";
    for (const [label, point] of [
        ["X", { x: 2, y: 0, z: 0 }],
        ["Y", { x: 0, y: 2, z: 0 }],
        ["Z", { x: 0, y: 0, z: 2 }]
    ]) {
        const end = project(point);
        context.beginPath();
        context.moveTo(origin.x, origin.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.fillStyle = "#d1d5db";
        context.fillText(label, end.x + 4, end.y);
    }

    context.fillStyle = "#f9fafb";
    context.beginPath();
    context.arc(origin.x, origin.y, 5, 0, Math.PI * 2);
    context.fill();
    context.fillText("Caméra", origin.x + 8, origin.y - 8);

    for (const object of scene.objects) {
        if (object.radius > 10) continue;
        const center = project(object.center);
        const radius = object.radius * 34;
        context.beginPath();
        context.arc(center.x, center.y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgb(${object.color.r}, ${object.color.g}, ${object.color.b})`;
        context.fill();
        context.strokeStyle = "#f9fafb";
        context.stroke();
    }

    for (const light of scene.lights) {
        if (light.type === "point") {
            const point = project(light.vector);
            context.beginPath();
            context.arc(point.x, point.y, 7, 0, Math.PI * 2);
            context.fillStyle = "#fde047";
            context.fill();
            context.fillStyle = "#f9fafb";
            context.fillText("Lumière", point.x + 10, point.y - 8);
        } else if (light.type === "directional") {
            const start = project({ x: 3, y: 2, z: 5 });
            const end = project({
                x: 3 + light.vector.x * 0.7,
                y: 2 + light.vector.y * 0.7,
                z: 5 + light.vector.z * 0.7
            });
            context.strokeStyle = "#fde047";
            context.beginPath();
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            context.stroke();
            context.fillStyle = "#f9fafb";
            context.fillText("Direction", start.x - 45, start.y - 8);
        }
    }

    context.fillStyle = "#d1d5db";
    context.fillText("Lumière ambiante", 16, 24);
}

export { createSceneView };

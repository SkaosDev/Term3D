function computeLighting(point, normal, lights) {
    let intensity = 0;
    const unitNormal = normal.normalize();

    for (const light of lights) {
        if (light.type === "ambient") {
            intensity += light.intensity;
            continue;
        }

        const direction = light.type === "point"
            ? light.vector.subtract(point)
            : light.vector;
        const cosine = unitNormal.dot(direction.normalize());

        if (cosine > 0) {
            intensity += light.intensity * cosine;
        }
    }

    return intensity;
}

export { computeLighting };

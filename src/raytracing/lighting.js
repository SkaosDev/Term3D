function computeLighting(point, normal, viewDirection, specular, lights) {
    let intensity = 0;
    const unitNormal = normal.normalize();
    const unitViewDirection = viewDirection.normalize();

    for (const light of lights) {
        if (light.type === "ambient") {
            intensity += light.intensity;
            continue;
        }

        const direction = light.type === "point"
            ? light.vector.subtract(point)
            : light.vector;
        const unitDirection = direction.normalize();
        const cosine = unitNormal.dot(unitDirection);

        if (cosine > 0) {
            intensity += light.intensity * cosine;
        }

        if (specular !== -1) {
            const reflectionViewCosine = unitDirection.reflect(unitNormal).dot(unitViewDirection);
            if (reflectionViewCosine > 0) {
                intensity += light.intensity * Math.pow(reflectionViewCosine, specular);
            }
        }
    }

    return intensity;
}

export { computeLighting };

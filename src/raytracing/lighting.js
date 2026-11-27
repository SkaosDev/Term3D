import { EPSILON, closestIntersection } from "./intersections.js";

function computeLighting(point, normal, viewDirection, specular, scene) {
    let intensity = 0;
    const unitNormal = normal.normalize();
    const unitViewDirection = viewDirection.normalize();

    for (const light of scene.lights) {
        if (light.type === "ambient") {
            intensity += light.intensity;
            continue;
        }

        const isPoint = light.type === "point";
        const direction = isPoint ? light.vector.subtract(point) : light.vector;
        const maxDistance = isPoint ? 1 : Infinity;

        if (closestIntersection(scene.objects, point, direction, EPSILON, maxDistance) !== null) {
            continue;
        }

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

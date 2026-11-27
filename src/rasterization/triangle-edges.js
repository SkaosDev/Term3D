import { interpolate } from "./interpolate.js";

function triangleEdges(p0, p1, p2, key) {
    const v01 = interpolate(p0.y, p0[key], p1.y, p1[key]);
    const v12 = interpolate(p1.y, p1[key], p2.y, p2[key]);
    const v02 = interpolate(p0.y, p0[key], p2.y, p2[key]);

    return [v02, [...v01.slice(0, -1), ...v12]];
}

export { triangleEdges };

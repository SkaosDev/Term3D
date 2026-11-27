function interpolate(i0, d0, i1, d1) {
    if (i0 === i1) return [d0];

    const values = [];
    const slope = (d1 - d0) / (i1 - i0);
    let d = d0;

    for (let i = i0; i <= i1; i++) {
        values.push(d);
        d += slope;
    }

    return values;
}

export { interpolate };

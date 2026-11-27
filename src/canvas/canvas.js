class Canvas {
    constructor(element) {
        this.width = element.width;
        this.height = element.height;
        this.context = element.getContext("2d");
        this.image = this.context.createImageData(this.width, this.height);
    }

    putPixel(x, y, color) {
        const column = this.width / 2 + Math.round(x);
        const row = this.height / 2 - Math.round(y) - 1;

        if (column < 0 || column >= this.width || row < 0 || row >= this.height) return;

        const index = (row * this.width + column) * 4;
        this.image.data[index] = color.r;
        this.image.data[index + 1] = color.g;
        this.image.data[index + 2] = color.b;
        this.image.data[index + 3] = 255;
    }

    present() {
        this.context.putImageData(this.image, 0, 0);
    }
}

export { Canvas };

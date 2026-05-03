function calculateGradientCoordinates(clientX, clientY, rect) {
    const { left, top, width, height } = rect;

    // Avoid division by zero
    if (width === 0 || height === 0) {
        return { x: 0, y: 0 };
    }

    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    return { x, y };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateGradientCoordinates };
}

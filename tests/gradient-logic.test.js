const { calculateGradientCoordinates } = require('../src/utils/gradient-logic');

describe('calculateGradientCoordinates', () => {
    test('calculates normalized coordinates correctly in the center', () => {
        const rect = { left: 100, top: 100, width: 200, height: 200 };
        const clientX = 200;
        const clientY = 200;
        const result = calculateGradientCoordinates(clientX, clientY, rect);
        expect(result).toEqual({ x: 0.5, y: 0.5 });
    });

    test('calculates normalized coordinates correctly at top-left corner', () => {
        const rect = { left: 100, top: 100, width: 200, height: 200 };
        const clientX = 100;
        const clientY = 100;
        const result = calculateGradientCoordinates(clientX, clientY, rect);
        expect(result).toEqual({ x: 0, y: 0 });
    });

    test('calculates normalized coordinates correctly at bottom-right corner', () => {
        const rect = { left: 100, top: 100, width: 200, height: 200 };
        const clientX = 300;
        const clientY = 300;
        const result = calculateGradientCoordinates(clientX, clientY, rect);
        expect(result).toEqual({ x: 1, y: 1 });
    });

    test('handles mouse outside the element (negative coordinates)', () => {
        const rect = { left: 100, top: 100, width: 200, height: 200 };
        const clientX = 50;
        const clientY = 50;
        const result = calculateGradientCoordinates(clientX, clientY, rect);
        expect(result).toEqual({ x: -0.25, y: -0.25 });
    });

    test('handles zero width or height to avoid division by zero', () => {
        const rect = { left: 100, top: 100, width: 0, height: 200 };
        const result = calculateGradientCoordinates(200, 200, rect);
        expect(result).toEqual({ x: 0, y: 0 });
    });
});

const { calculateGradientCoordinates } = require('../src/utils/gradient-logic');

describe('calculateGradientCoordinates', () => {
    const sharedRect = { left: 100, top: 100, width: 200, height: 200 };

    const testCases = [
        ['in the center', 200, 200, { x: 0.5, y: 0.5 }],
        ['at top-left corner', 100, 100, { x: 0, y: 0 }],
        ['at bottom-right corner', 300, 300, { x: 1, y: 1 }],
        ['outside the element (negative coordinates)', 50, 50, { x: -0.25, y: -0.25 }]
    ];

    test.each(testCases)('calculates normalized coordinates correctly %s', (description, clientX, clientY, expected) => {
        const result = calculateGradientCoordinates(clientX, clientY, sharedRect);
        expect(result).toEqual(expected);
    });

    test('handles mouse outside the element (positive out-of-bounds coordinates)', () => {
        const rect = { left: 100, top: 100, width: 200, height: 200 };
        const clientX = 400;
        const clientY = 400;
        const result = calculateGradientCoordinates(clientX, clientY, rect);
        expect(result).toEqual({ x: 1.5, y: 1.5 });
    });

    test('handles zero width or height to avoid division by zero', () => {
        const rect = { left: 100, top: 100, width: 0, height: 200 };
        const result = calculateGradientCoordinates(200, 200, rect);
        expect(result).toEqual({ x: 0, y: 0 });
    });
});

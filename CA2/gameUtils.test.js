import { test, expect } from '@jest/globals';

import {
    getGameDimensions,
    cardsMatch,
    canFlipCard,
    isGameComplete
} from './gameUtils.js';


// Test 1: Check that the game size is calculated correctly.
test('calculates the correct number of cards', () => {
    const result = getGameDimensions('3x4');

    expect(result.rows).toBe(3);
    expect(result.columns).toBe(4);
    expect(result.total).toBe(12);
});


// Test 2: Check that cards with the same shape and colour match.
test('identifies matching cards correctly', () => {
    const card1 = document.createElement('shape-card');
    const card2 = document.createElement('shape-card');

    card1.setAttribute('type', 'circle');
    card1.setAttribute('colour', 'red');

    card2.setAttribute('type', 'circle');
    card2.setAttribute('colour', 'red');

    expect(cardsMatch(card1, card2)).toBe(true);

    card2.setAttribute('colour', 'blue');

    expect(cardsMatch(card1, card2)).toBe(false);
});


// Test 3: Check that invalid card clicks are prevented.
test('prevents invalid card selections', () => {
    const card = {
        isFaceUp: () => false,
        dataset: { matched: 'false' }
    };

    expect(canFlipCard(card, false)).toBe(true);
    expect(canFlipCard(card, true)).toBe(false);

    card.dataset.matched = 'true';

    expect(canFlipCard(card, false)).toBe(false);

    card.dataset.matched = 'false';
    card.isFaceUp = () => true;

    expect(canFlipCard(card, false)).toBe(false);
});


// Test 4: Check that the game finishes when all pairs match.
test('detects when the game is complete', () => {
    expect(isGameComplete(5, 12)).toBe(false);
    expect(isGameComplete(6, 12)).toBe(true);
});

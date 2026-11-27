export function getGameDimensions(size) {
    const [rows, columns] = size.split('x').map(Number);
    const total = rows * columns;

    if (!Number.isInteger(rows) || !Number.isInteger(columns) ||
        rows <= 0 || columns <= 0 || total % 2 !== 0) {
        throw new Error('Invalid game size');
    }

    return { rows, columns, total };
}

export function cardsMatch(firstCard, secondCard) {
    return firstCard.getAttribute('type') === secondCard.getAttribute('type') &&
           firstCard.getAttribute('colour') === secondCard.getAttribute('colour');
}

export function canFlipCard(card, locked) {
    return !locked &&
           !card.isFaceUp() &&
           card.dataset.matched !== 'true';
}

export function isGameComplete(matchedPairs, total) {
    return matchedPairs === total / 2;
}

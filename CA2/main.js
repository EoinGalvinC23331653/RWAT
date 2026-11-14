import {ShapeCard} from './shapecard.js';

//MemoryGame custom element that manages the game logic and user interactions
class MemoryGame extends HTMLElement {
    connectedCallback() {
        const size = this.getAttribute('size');
        const [rows, columns] = size.split('x').map(Number);
        const total = rows * columns;

        this.innerHTML = '';
        this.style.display = 'grid';
        this.style.gridTemplateColumns = `repeat(${columns}, 102px)`;
        this.style.gap = '6px';
        this.style.width = 'max-content';
        this.style.margin = '0 auto';

        //Generates shuffled pairs of matching cards
        this.insertAdjacentHTML('beforeend',ShapeCard.getUniqueRandomCardsAsHTML(total / 2, true));

        let firstCard = null;
        let secondCard = null;
        let locked = false;
        let matchedPairs = 0;
        let clicks = 0;

        //Handles card clicks and prevent invalid selections
        this.querySelectorAll('shape-card').forEach(card => {
            card.addEventListener('click', () => {
                if (locked || card.isFaceUp() || card.dataset.matched === 'true') return;

                clicks++;
                card.flip();

                if (firstCard === null) {
                    firstCard = card;
                    return;
                }

                secondCard = card;
                locked = true;

                //Checks if both cards have the same shape and colour
                const isMatch =
                    firstCard.getAttribute('type') === secondCard.getAttribute('type') &&
                    firstCard.getAttribute('colour') === secondCard.getAttribute('colour');

                if (isMatch) {
                    firstCard.dataset.matched = 'true';
                    secondCard.dataset.matched = 'true';
                    matchedPairs++;

                    firstCard = null;
                    secondCard = null;
                    locked = false;

                    //Displays the results when all pairs have been matched
                    if (matchedPairs === total / 2) {
                        this.innerHTML = '';

                        this.style.display = 'block';

                        const message = document.createElement('p');
                        message.textContent = `You completed the game in ${clicks} clicks!`;

                        const button = document.createElement('button');
                        button.textContent = 'Play Again';

                        this.appendChild(message);
                        this.appendChild(button);

                        button.addEventListener('click', () => {
                            this.connectedCallback();
                        });
                    }
                }
                else {
                    //Flips non-matching cards back after one second
                    setTimeout(() => {
                        firstCard.flip();
                        secondCard.flip();

                        firstCard = null;
                        secondCard = null;
                        locked = false;
                    }, 1000);
                }
            });
        });
    }
}

customElements.define('memory-game', MemoryGame);
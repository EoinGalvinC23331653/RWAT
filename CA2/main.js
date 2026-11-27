import {ShapeCard} from './shapecard.js';
import {getGameDimensions, cardsMatch, canFlipCard, isGameComplete} from './gameUtils.js';
import {db} from './firebase.js';
import {collection, addDoc, getDocs, serverTimestamp} from 'firebase/firestore';

//MemoryGame custom element that manages the game logic and user interactions
class MemoryGame extends HTMLElement {
    connectedCallback() {
        const size = this.getAttribute('size');
        const { rows, columns, total } = getGameDimensions(size);

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
                if (!canFlipCard(card, locked)) return;

                clicks++;
                card.flip();

                if (firstCard === null) {
                    firstCard = card;
                    return;
                }

                secondCard = card;
                locked = true;

                //Checks if both cards have the same shape and colour
                const isMatch = cardsMatch(firstCard, secondCard);

                if (isMatch) {
                    firstCard.dataset.matched = 'true';
                    secondCard.dataset.matched = 'true';
                    matchedPairs++;

                    firstCard = null;
                    secondCard = null;
                    locked = false;

                    //Displays the results when all pairs have been matched
                    if (isGameComplete(matchedPairs, total)) {
                        // Save the completed game result to Firestore
                        addDoc(collection(db, 'gameResults'), {
                            clicks: clicks,
                            completedAt: serverTimestamp()
                        })
                        .then(() => {
                            console.log('Game result saved successfully.');
                        })
                        .catch(error => {
                            console.error('Error saving game result:', error);
                        });

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

// Get the button and paragraph used to display the average
const averageButton = document.getElementById('averageButton');
const averageResult = document.getElementById('averageResult');

averageButton.addEventListener('click', () => {

    averageButton.disabled = true;
    averageResult.textContent = 'Loading results...';

    // Retrieve all completed game results from Firestore
    getDocs(collection(db, 'gameResults'))
    .then(snapshot => {

        if (snapshot.empty) {
            averageResult.textContent = 'No completed games found.';
            return;
        }

        // Calculate the total number of clicks
        const totalClicks = snapshot.docs.reduce((total, document) => {
            return total + document.data().clicks;
        }, 0);

        // Calculate the average number of clicks
        const averageClicks = totalClicks / snapshot.size;

        averageResult.textContent =
            `Average clicks: ${averageClicks.toFixed(2)}`;
    })
    .catch(error => {
        console.error('Error retrieving game results:', error);
        averageResult.textContent = 'Unable to retrieve game results.';
    })
    .finally(() => {
        averageButton.disabled = false;
    });
});
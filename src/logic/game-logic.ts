import { Card } from "../types/types";

let flippedCards: Card[] = [];
let scoreBlue = 0;
let scoreOrange = 0;
let currentPlayer: 'blue' | 'orange' = 'blue';

export function initGame(startPlayer: 'blue' | 'orange'): void {
  flippedCards = [];
  scoreBlue = 0;
  scoreOrange = 0;
  currentPlayer = startPlayer;
}

export function createDeck(size: number): Card[] {
  const deck: Card[] = [];
  const numberOfPairs = size / 2;

  // KORRIGIERT: Wir nutzen die Zahlen "1" bis "18", die exakt deinen Dateinamen (1.svg) entsprechen!
  const cardValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];

  for (let i = 0; i < numberOfPairs; i++) {
    const currentMotive = cardValues[i]; // Holt sich nacheinander "1", "2", "3"...

    for (let j = 0; j < 2; j++) {
      deck.push({
        id: 0, // KORRIGIERT: Einfach 0 als Platzhalter, wird gleich in shuffle() perfekt überschrieben!
        value: currentMotive, // Jedes Bild-Motiv kommt genau 2x ins Deck
        isFlipped: false,
        isMatched: false,
      });
    }
  }
  const shuffledDeck = shuffle(deck);
  console.log("Die ersten 5 Karten im frisch gemischten Deck:", shuffledDeck.slice(0, 5)); // Debug-Ausgabe der ersten 5 Karten
  return shuffledDeck;
}

function shuffle(array: any[]): any[] {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex],
    ];
  }

  // Vergibt nach dem Mischen saubere Ganzzahlen (0, 1, 2, 3...), die parseInt fehlerfrei lesen kann
  return array.map((card, index) => ({ ...card, id: index }));
}

export function setupGameListeners(
  allCards: Card[], 
  render: () => void, 
  onExit: () => void // 👈 Das ist die Funktion, die das Modal öffnet!
): void {
  const gridRef = document.getElementById('game-grid');
  
  // === ERGÄNZUNG: Hier fangen wir den Klick auf den Exit-Button ab! ===
  const exitBtnRef = document.getElementById('exit-game-btn'); // Nutzt die ID deines Exit-Buttons
  if (exitBtnRef) {
    exitBtnRef.onclick = () => {
      onExit(); // 👈 Ruft die Logik auf, die ".is-open" an das Modal hängt!
    };
  }

  // Dein bestehender Code für die Karten bleibt genau so, wie er ist:
  if (gridRef) {
    gridRef.addEventListener('click', (e) => {
      const cardElement = (e.target as HTMLElement).closest('.card') as HTMLButtonElement;
      
      if (cardElement) {
        const cardId = parseInt(cardElement.getAttribute('data-id') || "-1");
        const clickedCard = allCards.find(c => c.id === cardId);

        if (clickedCard && !clickedCard.isFlipped && !clickedCard.isMatched) {
          handleCardClick(clickedCard, cardElement, render);
        }
      }
    });
  }
}

function handleCardClick(card: Card, cardElement: HTMLButtonElement, render: () => void): void {
  if (flippedCards.length >= 2) return;

  card.isFlipped = true;
  cardElement.classList.add('is-flipped');
  flippedCards.push(card);
  if (flippedCards.length === 2) {
    checkForMatch(render);
  }
}

function checkForMatch(render: () => void): void {
  const [card1, card2] = flippedCards;

  if (card1.value === card2.value) {
    card1.isMatched = true;
    card2.isMatched = true;
    awardPoint();
    flippedCards = [];
    render();
  } else {
    resetUnmatchedCards(card1, card2, render);
  }
}

function resetUnmatchedCards(card1: Card, card2: Card, render: () => void): void {
  setTimeout(() => {
    card1.isFlipped = false;
    card2.isFlipped = false;
    flippedCards = [];
    switchPlayer();
    render();
  }, 1000);
}

function awardPoint(): void {
  if (currentPlayer === 'blue') {
    scoreBlue++;
  } else {
    scoreOrange++;
  }
}

function switchPlayer(): void {
  currentPlayer = currentPlayer === 'blue' ? 'orange' : 'blue';
}

export function getGameState() {
  return {
    scores: { blue: scoreBlue, orange: scoreOrange },
    activePlayer: currentPlayer
  };
}

export function getGameResult(totalCards: number) {
  const totalPairs = totalCards / 2;
  const currentPairsFound = scoreBlue + scoreOrange;

  // Wenn noch nicht alle Paare gefunden wurden, ist das Spiel noch im Gange
  if (currentPairsFound < totalPairs) {
    return { isGameOver: false, winner: null };
  }

  // Wenn alle Paare gefunden wurden, ermitteln wir das Ergebnis
  if (scoreBlue > scoreOrange) {
    return { isGameOver: true, winner: 'blue' as const };
  } else if (scoreOrange > scoreBlue) {
    return { isGameOver: true, winner: 'orange' as const };
  } else {
    return { isGameOver: true, winner: 'draw' as const }; // 'draw' bedeutet Unentschieden!
  }
}
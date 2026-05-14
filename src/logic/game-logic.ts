import { Card } from "../types/types";

export function createDeck(size: number): Card[] {
  const deck: Card[] = [];
  const numberOfPairs = size / 2;

  const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "teal", "brown", "lime", "cyan", "gold"];

    for (let i = 0; i < numberOfPairs; i++) {
    const colorValue = colors[i];

    for (let j = 0; j < 2; j++) {
      deck.push({
        id: Math.random(), 
        value: colorValue,
        isFlipped: false,
        isMatched: false,
      });
    }
  }
  return shuffle(deck);
}

function shuffle(array: any[]): any[] {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    // Wähle ein verbleibendes Element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // ...und tausche es mit dem aktuellen Element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex],
    ];
  }

  // Jetzt geben wir jeder Karte eine endgültige, saubere ID basierend auf ihrer Position
  return array.map((card, index) => ({ ...card, id: index }));
}

export function setupGameListeners(
  allCards: Card[], 
  render: () => void, 
  onExit: () => void
): void {
  const gridRef = document.getElementById('game-grid');

  if (gridRef) {
    gridRef.addEventListener('click', (e) => {
      const cardElement = (e.target as HTMLElement).closest('.card') as HTMLButtonElement;
      
      if (cardElement) {
        const cardId = parseInt(cardElement.getAttribute('data-id') || "-1");
        const clickedCard = allCards.find(c => c.id === cardId);

        // Wir prüfen: Karte da? Noch zu? Noch kein Treffer?
        if (clickedCard && !clickedCard.isFlipped && !clickedCard.isMatched) {
          handleCardClick(clickedCard, render);
        }
      }
    });
  }

  // Der Exit-Button bekommt seine eigene "Telefonnummer" (onExit)
  const exitBtn = document.getElementById('exit-game-btn');
  exitBtn?.addEventListener('click', () => {
    onExit();
  });
}

function handleCardClick(card: Card, render: () => void): void {
  // 1. Im Daten-Modell auf "offen" setzen
  card.isFlipped = true;

  // 2. Sofort neu rendern, damit die main.ts das HTML aktualisiert
  render();

  // HIER bauen wir morgen die Paare-Prüfung ein!
}
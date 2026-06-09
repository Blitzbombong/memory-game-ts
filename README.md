# 🎮 Memory Game (TypeScript & Sass)

Ein interaktives 2-Spieler-Memory-Spiel, das ich als Abschlussprojekt entwickelt habe. Der Fokus lag hierbei auf einer sauberen Trennung von Spiel-Logik (State-Management) und UI-Rendering sowie der Umsetzung eines flexiblen Theme-Systems mittels Sass.

## 🔗 Live Demo
Das Spiel kann direkt hier im Browser gespielt werden:
👉 [https://w-giesbrecht.github.io/memory-game-ts/](https://w-giesbrecht.github.io/memory-game-ts/)

---

## ⚡ Quick Start (Vite)

Um das Projekt in weniger als einer Minute lokal zu starten, führe diese Befehle im Terminal aus:

```bash
git clone [https://github.com/w-giesbrecht/memory-game-ts.git](https://github.com/w-giesbrecht/memory-game-ts.git)
cd memory-game-ts
npm install
npm run dev
```

---

## 🔥 Features & Funktionen

- **2-Spieler-Modus:** Lokales Duell (Blauer Spieler gegen Orangener Spieler) mit automatischer Punkte- und Rundenverwaltung.
- **Drei Board-Größen:** Spielfelder mit wahlweise 16, 24 oder 36 Karten.
- **Zwei umschaltbare Themes:**
  - `Code Vibes`: Minimalistischer Entwickler-Look (eckige UI, Mint-Töne, Code-Schriftart).
  - `Gaming`: Dynamischer Neon-Look (abgerundete Ecken, angepasste Schatten, Pink/Blau-Kontraste).
- **Echtzeit-Vorschau:** Im Einstellungsmenü ändert sich die Cover-Vorschau dynamisch je nach ausgewähltem Theme.
- **Ergebnis-Screens:** Zeitgesteuerte Auswertung am Spielende für ein Unentschieden (`Draw`) oder die Verkündung des Gewinners (inklusive optischem Konfetti-Effekt).
- **Exit-Dialog:** Ein interaktives Modal sichert das Spiel gegen versehentliches Abbrechen ab.

---

## 🛠️ Code-Struktur & Architektur (Clean Code)

Beim Refactoring des Projekts habe ich großen Wert auf die Wartbarkeit und Übersichtlichkeit gelegt:

- **Single Responsibility Principle (SRP):** Die `main.ts` agiert primär als "Verkehrspolizist" (Zentraler Router/Render). Komplexe Logiken wie das Mischen der Karten (`createDeck`), die Listener-Verwaltung oder das Auslese-System der DOM-Einstellungen wurden in spezialisierte Hilfsfunktionen ausgelagert.
- **Modulares SCSS (7-1 Pattern Basis):** - Globale Variablen, Mixins und Resets liegen strikt getrennt in einem `abstracts`-Ordner.
  - Das Design wurde in wiederverwendbare UI-Komponenten (wie eine zentrale `_buttons.scss` für alle Button-Typen der App) und bildschirmspezifische `screens`-Styles unterteilt.
  - Die Theme-Umschaltung wird sauber über CSS-Variablen gesteuert, die an die Klassen `.theme-code-vibes` und `.theme-gaming` gekoppelt sind.
- **CI/CD Build-Pipeline:** Automatisiertes Testen und Deployment auf GitHub Pages via GitHub Actions bei jedem Push.

---
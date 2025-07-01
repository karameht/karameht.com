let startTime: number | null = null;
let endTime: number | null = null;
let currentWPM: number | null = null;
const wordCount: number = 319;

function startReading(): void {
  startTime = Date.now();

  const startButton = document.getElementById("startReading") as HTMLButtonElement;
  const stopButton = document.getElementById("stopReading") as HTMLButtonElement;
  const readingText = document.getElementById("readingText") as HTMLElement;
  const resultContainer = document.getElementById("resultContainer") as HTMLElement;

  startButton.textContent = "LÄUFT...";
  startButton.classList.add("active");
  startButton.disabled = true;
  stopButton.disabled = false;
  readingText.classList.add("reading-time__reading-text--active");
  resultContainer.classList.remove("reading-time__result-container--show");
}

function stopReading(): void {
  endTime = Date.now();

  if (startTime !== null) {
    const timeInMinutes: number = (endTime - startTime) / 60000;
    const wordsPerMinute: number = Math.round(wordCount / timeInMinutes);

    const stopButton = document.getElementById("stopReading") as HTMLButtonElement;
    const readingText = document.getElementById("readingText") as HTMLElement;

    stopButton.disabled = true;
    readingText.classList.remove("reading-time__reading-text--active");

    displayResults(timeInMinutes, wordsPerMinute);
    currentWPM = wordsPerMinute;
  }
}

function displayResults(timeInMinutes: number, wpm: number): void {
  const resultContainer = document.getElementById("resultContainer") as HTMLElement;
  const resultText = document.getElementById("resultText") as HTMLElement;

  const minutes: number = Math.floor(timeInMinutes);
  const seconds: number = Math.round((timeInMinutes - minutes) * 60);

  resultText.innerHTML = `
    <strong>Deine Lesezeit:</strong> ${minutes}:${seconds.toString().padStart(2, "0")} Minuten<br>
    <strong>Deine Lesegeschwindigkeit:</strong> ${wpm} Wörter pro Minute<br>
    <em>Zum Vergleich: Der Durchschnitt liegt bei 200 WPM</em>
  `;

  resultContainer.classList.add("reading-time__result-container--show");
}

function saveResult(): void {
  if (currentWPM) {
    const saveButton = document.getElementById("saveResult") as HTMLButtonElement;
    const continueStoryButton = document.getElementById("continueStory") as HTMLAnchorElement;

    localStorage.setItem("userReadingSpeed", currentWPM.toString());

    saveButton.textContent = "Gespeichert! ✓";
    saveButton.style.background = "#059669";
    saveButton.disabled = true;

    if (continueStoryButton) {
      continueStoryButton.style.display = "inline-block";
    }
  }
}

export function initReadingTimer(): void {
  const startButton = document.getElementById("startReading") as HTMLButtonElement;
  const stopButton = document.getElementById("stopReading") as HTMLButtonElement;
  const saveButton = document.getElementById("saveResult") as HTMLButtonElement;

  if (startButton && stopButton && saveButton) {
    startButton.addEventListener("click", startReading);
    stopButton.addEventListener("click", stopReading);
    saveButton.addEventListener("click", saveResult);
  }
}

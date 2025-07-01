function calculateReadingTime(wordCount: number): string {
  const savedWPM = localStorage.getItem("userReadingSpeed");
  const userWPM = savedWPM ? parseInt(savedWPM) : 200;

  const minutes = Math.round(wordCount / userWPM);
  const timeText = minutes === 1 ? "1 Min" : `${minutes} Min`;

  return `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12,6 12,12 16,14"></polyline>
    </svg>
    ${timeText}
  `;
}

function createCalibrateElement(): HTMLAnchorElement {
  const link = document.createElement("a");
  link.href = "/profil/lesezeit";
  link.className = "reading-time__calibrate";
  link.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="6" x2="12" y2="12"></line>
    </svg>
    Lesezeit kalibrieren
  `;
  return link;
}

export function initReadingTimeDisplay(): void {
  const readingTimeElements = document.querySelectorAll(".reading-time");
  const savedWPM = localStorage.getItem("userReadingSpeed");

  readingTimeElements.forEach((element) => {
    const wordCount = parseInt(element.getAttribute("data-word-count") || "0");
    if (wordCount > 0) {
      if (savedWPM) {
        element.innerHTML = calculateReadingTime(wordCount);
      } else {
        element.innerHTML = "";
        element.appendChild(createCalibrateElement());
      }
    }
  });
}

// Main application entry point
import { initMenu } from "./components/menu.ts";
import { initProgressBar } from "./components/progressBar.ts";
import { initReadingTimeDisplay } from "./components/readingTimeDisplay.ts";
import { initReadingTimer } from "./components/readingTimer.ts";

// Initialize all components
document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initProgressBar();
  initReadingTimer();
  initReadingTimeDisplay();
});

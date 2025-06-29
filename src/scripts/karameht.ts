// Main application entry point
import { initMenu } from "./components/menu.ts";
import { initProgressBar } from "./components/progressBar.ts";

// Initialize all components
document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initProgressBar();
});

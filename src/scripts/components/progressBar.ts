export function initProgressBar(): void {
  const progressFill = document.querySelector(".progress-bar__fill") as HTMLElement;

  if (!progressFill) return;

  function updateProgressBar(): void {
    const windowHeight: number = window.innerHeight;
    const documentHeight: number = document.documentElement.scrollHeight - windowHeight;
    const scrollTop: number = window.pageYOffset || document.documentElement.scrollTop;
    const progress: number = Math.min((scrollTop / documentHeight) * 100, 100);

    progressFill.style.height = `${progress}%`;
  }

  window.removeEventListener("scroll", updateProgressBar);

  window.addEventListener("scroll", updateProgressBar, { passive: true });
  updateProgressBar();
}

document.addEventListener("astro:page-load", initProgressBar);

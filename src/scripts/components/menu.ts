export function initMenu(): void {
  const menuToggle = document.getElementById("menuToggle") as HTMLButtonElement;
  const mobileNav = document.querySelector(".nav.header__nav--mobile") as HTMLElement;

  if (menuToggle && mobileNav) {
    menuToggle.removeEventListener("click", handleMenuToggle);
    menuToggle.addEventListener("click", handleMenuToggle);
  }
}

function handleMenuToggle() {
  const menuToggle = document.getElementById("menuToggle") as HTMLButtonElement;
  const mobileNav = document.querySelector(".nav.header__nav--mobile") as HTMLElement;

  if (menuToggle && mobileNav) {
    menuToggle.classList.toggle("open");
    mobileNav.classList.toggle("open");
  }
}

document.addEventListener("astro:page-load", initMenu);

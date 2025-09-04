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
  const html = document.documentElement;
  const body = document.body;

  if (menuToggle && mobileNav) {
    const willOpen = !menuToggle.classList.contains("open");
    menuToggle.classList.toggle("open");
    mobileNav.classList.toggle("open");
    html.classList.toggle("no-scroll", willOpen);
    body.classList.toggle("no-scroll", willOpen);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cleanup();
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".header__nav--mobile a")) {
        cleanup();
      }
    };
    const cleanup = () => {
      menuToggle.classList.remove("open");
      mobileNav.classList.remove("open");
      html.classList.remove("no-scroll");
      body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };

    if (willOpen) {
      document.addEventListener("keydown", onKey);
      document.addEventListener("click", onClick);
    }
  }
}

document.addEventListener("astro:page-load", initMenu);

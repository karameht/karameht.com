export function initMenu(): void {
  const menuToggle = document.getElementById('menuToggle') as HTMLButtonElement;
  const mobileNav = document.querySelector('.nav.header__nav--mobile') as HTMLElement;

  if (menuToggle && mobileNav) {
    // Ensure closed state is non-focusable
    mobileNav.setAttribute('aria-hidden', 'true');
    // @ts-ignore
    (mobileNav as any).inert = true;
    menuToggle.removeEventListener('click', handleMenuToggle);
    menuToggle.addEventListener('click', handleMenuToggle);
  }
}

function handleMenuToggle() {
  const menuToggle = document.getElementById('menuToggle') as HTMLButtonElement;
  const mobileNav = document.querySelector('.nav.header__nav--mobile') as HTMLElement;
  const html = document.documentElement;
  const body = document.body;

  if (menuToggle && mobileNav) {
    const willOpen = !menuToggle.classList.contains('open');
    menuToggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    mobileNav.setAttribute('aria-hidden', String(!willOpen));
    // @ts-ignore
    (mobileNav as any).inert = !willOpen;
    html.classList.toggle('no-scroll', willOpen);
    body.classList.toggle('no-scroll', willOpen);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cleanup();
        menuToggle.focus();
      }
      if (e.key === 'Tab' && mobileNav.classList.contains('open')) {
        const focusables = mobileNav.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length > 0) {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.header__nav--mobile a')) {
        cleanup();
      }
    };
    const cleanup = () => {
      menuToggle.classList.remove('open');
      mobileNav.classList.remove('open');
      html.classList.remove('no-scroll');
      body.classList.remove('no-scroll');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      // @ts-ignore
      (mobileNav as any).inert = true;
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };

    if (willOpen) {
      const firstLink = mobileNav.querySelector('a');
      (firstLink as HTMLElement | null)?.focus();
      document.addEventListener('keydown', onKey);
      document.addEventListener('click', onClick);
      menuToggle.setAttribute('aria-label', 'Menü schließen');
    } else {
      menuToggle.setAttribute('aria-label', 'Menü öffnen');
    }
  }
}

document.addEventListener('astro:page-load', initMenu);

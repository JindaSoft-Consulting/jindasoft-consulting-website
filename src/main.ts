import { initNavigation } from './modules/navigation';
import { initScrollspy } from './modules/scrollspy';
import { initRevealAnimations } from './modules/reveal';
import { initContactForm } from './modules/contactForm';
import { initCopyrightYear } from './modules/copyright';
import { initThemeModule } from './modules/theme';

function initApp(): void {
  initNavigation();
  initScrollspy();
  initRevealAnimations();
  initContactForm();
  initCopyrightYear();
  initThemeModule();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

import { ThemePreference, ResolvedTheme } from '../types/theme';
import darkWebp from '../../assets/dark-background-wordmark.webp';
import darkPng from '../../assets/dark-background-wordmark.png';
import lightWebp from '../../assets/wordmark.webp';
import lightPng from '../../assets/wordmark.png';

const STORAGE_KEY = 'theme-preference';
const VALID_PREFERENCES: ThemePreference[] = ['light', 'dark', 'system'];

function isThemePreference(value: string | null): value is ThemePreference {
  return value !== null && (VALID_PREFERENCES as string[]).includes(value);
}

export function initThemeModule(): void {
  const themeTriggerBtn = document.getElementById('theme-selector-trigger');
  const themeTriggerText = document.getElementById('theme-trigger-text');
  const themePopoverMenu = document.getElementById('theme-menu');
  const themeRadioInputs = document.querySelectorAll<HTMLInputElement>('input[name="theme-preference"]');

  function getStoredPreference(): ThemePreference {
    try {
      const val = localStorage.getItem(STORAGE_KEY);
      return isThemePreference(val) ? val : 'light';
    } catch (e) {
      return 'light';
    }
  }

  function setStoredPreference(pref: ThemePreference): void {
    try {
      if (VALID_PREFERENCES.includes(pref)) {
        localStorage.setItem(STORAGE_KEY, pref);
      }
    } catch (e) {
      // Graceful fallback when localStorage is disabled or throws security errors
    }
  }

  function resolveTheme(pref: ThemePreference): ResolvedTheme {
    if (pref === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return pref;
  }

  function applyTheme(pref: ThemePreference, enableTransition = true): void {
    const derivedTheme = resolveTheme(pref);

    if (enableTransition && !window.matchMedia('(prefers-color-scheme: reduce)').matches) {
      const transitionTargets = document.querySelectorAll<HTMLElement>(
        'body, .site-header, .nav-menu, .card, .highlight-item, .process-step, .ms-focus-box, .showcase-notice, .form-control'
      );
      transitionTargets.forEach(el => el.classList.add('theme-transitioning'));

      setTimeout(() => {
        transitionTargets.forEach(el => el.classList.remove('theme-transitioning'));
      }, 300);
    }

    document.documentElement.setAttribute('data-theme', derivedTheme);

    // Update Brand Wordmark for Dark / Light theme (Header & Footer)
    const wordmarkSource = document.getElementById('wordmark-source') as HTMLSourceElement | null;
    const wordmarkImg = document.getElementById('wordmark-img') as HTMLImageElement | null;
    const footerWordmarkSource = document.getElementById('footer-wordmark-source') as HTMLSourceElement | null;
    const footerWordmarkImg = document.getElementById('footer-wordmark-img') as HTMLImageElement | null;

    if (derivedTheme === 'dark') {
      if (wordmarkSource) wordmarkSource.srcset = darkWebp;
      if (wordmarkImg) wordmarkImg.src = darkPng;
      if (footerWordmarkSource) footerWordmarkSource.srcset = darkWebp;
      if (footerWordmarkImg) footerWordmarkImg.src = darkPng;
    } else {
      if (wordmarkSource) wordmarkSource.srcset = lightWebp;
      if (wordmarkImg) wordmarkImg.src = lightPng;
      if (footerWordmarkSource) footerWordmarkSource.srcset = lightWebp;
      if (footerWordmarkImg) footerWordmarkImg.src = lightPng;
    }

    // Capitalise preference for display
    const labelTitle = pref.charAt(0).toUpperCase() + pref.slice(1);
    if (themeTriggerText) {
      themeTriggerText.textContent = labelTitle;
    }
    if (themeTriggerBtn) {
      themeTriggerBtn.setAttribute('aria-label', `Theme: ${labelTitle}. Change theme`);
    }

    // Sync radio input checked state
    themeRadioInputs.forEach(radio => {
      radio.checked = (radio.value === pref);
    });
  }

  // Initialize UI state matching current stored preference
  const currentPref = getStoredPreference();
  applyTheme(currentPref, false);

  // Radio input change handler
  themeRadioInputs.forEach(radio => {
    radio.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement | null;
      if (!target) return;
      const newPref = target.value;
      if (isThemePreference(newPref)) {
        setStoredPreference(newPref);
        applyTheme(newPref, true);
      }
    });
  });

  // Dynamic system theme synchronization
  const systemMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemThemeChange = (): void => {
    if (getStoredPreference() === 'system') {
      applyTheme('system', true);
    }
  };

  if (systemMediaQuery.addEventListener) {
    systemMediaQuery.addEventListener('change', handleSystemThemeChange);
  } else if ('addListener' in systemMediaQuery) {
    (systemMediaQuery as unknown as { addListener: (cb: () => void) => void }).addListener(handleSystemThemeChange);
  }

  // Move focus and position popover relative to trigger when opened
  if (themePopoverMenu && themeTriggerBtn) {
    themePopoverMenu.addEventListener('toggle', (e: Event) => {
      const toggleState = (e as Event & { newState?: string }).newState;
      if (toggleState === 'open') {
        const triggerRect = themeTriggerBtn.getBoundingClientRect();
        themePopoverMenu.style.top = `${triggerRect.bottom + 8}px`;
        themePopoverMenu.style.left = `${triggerRect.left}px`;
        themePopoverMenu.style.width = `${triggerRect.width}px`;
        themePopoverMenu.style.right = 'auto';

        const checkedRadio = themePopoverMenu.querySelector<HTMLInputElement>('input[name="theme-preference"]:checked');
        if (checkedRadio) {
          checkedRadio.focus();
        }
      }
    });
  }
}

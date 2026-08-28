export function initContactForm(): void {
  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
  const formStatus = document.getElementById('form-status') as HTMLElement | null;

  if (contactForm) {
    contactForm.addEventListener('submit', async (e: Event) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (!submitBtn) return;
      const originalBtnText = submitBtn.textContent || '';

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      if (formStatus) {
        formStatus.style.display = 'none';
      }

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data: unknown = await response.json();

        // Runtime validation check alongside TypeScript types
        if (
          typeof data === 'object' &&
          data !== null &&
          'success' in data &&
          (data as { success: unknown }).success === true
        ) {
          if (formStatus) {
            formStatus.textContent = 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
            formStatus.style.color = 'var(--color-cyan)';
            formStatus.style.display = 'block';
          }
          contactForm.reset();
        } else {
          const errorMessage = (typeof data === 'object' && data !== null && 'message' in data && typeof (data as { message: unknown }).message === 'string')
            ? (data as { message: string }).message
            : 'Form submission failed';
          throw new Error(errorMessage);
        }
      } catch (error) {
        if (formStatus) {
          formStatus.textContent = 'Oops! There was an issue sending your message. Please email us directly at info@jindasoftconsulting.com.';
          formStatus.style.color = 'var(--color-error)';
          formStatus.style.display = 'block';
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }
}

function normalizeText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function findElementByText(text: string): HTMLElement | null {
  const target = normalizeText(text);

  const elements = document.querySelectorAll<HTMLElement>(
    'button, a, input, textarea, select, [role="button"], [role="link"]',
  );

  for (const element of elements) {
    if (normalizeText(element.textContent ?? '') === target) {
      return element;
    }

    if (
      element instanceof HTMLInputElement &&
      normalizeText(element.placeholder) === target
    ) {
      return element;
    }
  }

  return null;
}

export function clickByText(text: string): boolean {
  const element = findElementByText(text);

  if (!element) {
    return false;
  }

  element.click();
  return true;
}

export function typeByText(
  text: string,
  value: string,
): boolean {
  const element = findElementByText(text);

  if (!element) {
    return false;
  }

  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement
  ) {
    element.focus();
    element.value = value;

    element.dispatchEvent(
      new Event('input', {
        bubbles: true,
      }),
    );

    element.dispatchEvent(
      new Event('change', {
        bubbles: true,
      }),
    );

    return true;
  }

  return false;
}

export function hasText(text: string): boolean {
  const target = normalizeText(text);

  return normalizeText(document.body.innerText).includes(target);
}
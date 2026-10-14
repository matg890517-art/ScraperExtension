import type { Action, Script } from './types';
import { browser } from 'wxt/browser';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function executeInPage<T>(
  tabId: number,
  func: (...args: any[]) => T,
  args: any[] = [],
): Promise<T | undefined> {
  const results = await browser.scripting.executeScript({
    target: { tabId },
    func,
    args,
  });

  return results[0]?.result;
}

async function click(
  tabId: number,
  text: string,
): Promise<void> {
  const success = await executeInPage(
    tabId,
    (text: string) => {
      function normalize(value: string) {
        return value.replace(/\s+/g, ' ').trim();
      }

      const target = normalize(text);

      const elements = document.querySelectorAll<HTMLElement>(
        'button, a, [role="button"], [role="link"]',
      );

      for (const element of elements) {
        if (normalize(element.textContent ?? '') === target) {
          element.click();
          return true;
        }
      }

      return false;
    },
    [text],
  );

  if (!success) {
    throw new Error(`Could not find element: "${text}"`);
  }
}

async function type(
  tabId: number,
  text: string,
  value: string,
): Promise<void> {
  const success = await executeInPage(
    tabId,
    (text: string, value: string) => {
      function normalize(input: string) {
        return input.replace(/\s+/g, ' ').trim();
      }

      const target = normalize(text);

      const elements = document.querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement
      >(
        'input, textarea',
      );

      for (const element of elements) {
        const label = normalize(
          element.getAttribute('aria-label') ??
            element.placeholder ??
            '',
        );

        if (label === target) {
          element.focus();
          element.value = value;

          element.dispatchEvent(
            new Event('input', { bubbles: true }),
          );

          element.dispatchEvent(
            new Event('change', { bubbles: true }),
          );

          return true;
        }
      }

      return false;
    },
    [text, value],
  );

  if (!success) {
    throw new Error(`Could not find input: "${text}"`);
  }
}

async function waitFor(
  tabId: number,
  text: string,
  timeout = 10000,
): Promise<void> {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    const exists = await executeInPage(
      tabId,
      (text: string) => {
        return document.body.innerText.includes(text);
      },
      [text],
    );

    if (exists) {
      return;
    }

    await sleep(200);
  }

  throw new Error(
    `Timeout waiting for: "${text}"`,
  );
}

export async function executeAction(
  tabId: number,
  action: Action,
): Promise<void> {
  switch (action.type) {
    case 'click':
      await click(tabId, action.text);
      break;

    case 'type':
      await type(tabId, action.text, action.value);
      break;

    case 'wait':
      await sleep(action.ms);
      break;

    case 'waitFor':
      await waitFor(
        tabId,
        action.text,
        action.timeout,
      );
      break;
  }
}

export async function runScript(
  tabId: number,
  script: Script,
): Promise<void> {
  for (const action of script) {
    await executeAction(tabId, action);
  }
}
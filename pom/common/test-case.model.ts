import { TestDetails } from '@playwright/test';

export interface TestCase<T> {
  id: string;
  title: string;
  description?: string;
  tags: string | string[];
  data: T;
}

export const Tags = {
  POSITIVE: '@positive',
  NEGATIVE: '@negative',
  SMOKE: '@smoke',
  REGRESSION: '@regression',
  FUNCTIONAL: '@functional',
  E2E: '@e2e',
  UI: '@ui',
  SECURITY: '@security',
  BVA: '@bva',
  EP: '@ep',
  STRESS: '@stress',
} as const;

export function testTitle(id: string, title: string): string {
  return `${id} - ${title}`;
}

export function testDetails(tags: string | string[], description: string): TestDetails {
  return {
    tag: tags,
    annotation: {
      type: 'Description',
      description: description,
    },
  };
}
